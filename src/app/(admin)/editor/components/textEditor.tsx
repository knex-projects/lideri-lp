'use client';
import type { RichTextEditorProps } from '@/src/types';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';


const ReactQuill = dynamic(
    () => import('react-quill-new'),
    {
        ssr: false,
        loading: () => (
            <div className="w-92 h-75 bg-gray-50 border border-[rgb(108,108,108)] rounded-[0.5rem] animate-pulse flex items-center justify-center text-sm text-gray-400">
                Carregando editor...
            </div>
        )
    }
) as unknown as React.ComponentType<any>;

import 'react-quill-new/dist/quill.snow.css';

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const quillRef = useRef<any>(null);
    const lastSelectionRef = useRef<{ index: number; length: number } | null>(null);
    const [quillReady, setQuillReady] = useState(false);
    const [fontSizePx, setFontSizePx] = useState<number>(16);

    const CORES_PRINCIPAIS = ['#000000', '#ffffff', '#87240E', '#6C6C6C', '#F9FAFB', '#1A3A8C', '#680000'];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('quill').then((QuillModule) => {
                const Quill = QuillModule.default;
                const Size = Quill.import('attributors/style/size') as any;

                delete Size.whitelist;
                Quill.register(Size, true);

                setQuillReady(true);
            });
        }
    }, []);

    const handleApplyFontSize = (pxValue: number) => {
        if (isNaN(pxValue) || pxValue <= 0) return;

        const boundedPx = Math.max(8, Math.min(pxValue, 120));
        setFontSizePx(boundedPx);

        const remValue = `${(boundedPx / 16).toFixed(4).replace(/\.?0+$/, '')}rem`;

        const quillEditor = quillRef.current?.getEditor();
        if (quillEditor) {
            quillEditor.focus();
            
            if (lastSelectionRef.current) {
                quillEditor.setSelection(
                    lastSelectionRef.current.index,
                    lastSelectionRef.current.length
                );
            }

            quillEditor.format('size', remValue);
        }
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: '#custom-toolbar',
        },
    }), []);

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'size',
        'header',
        'list',
        'align',
        'color',
        'link'
    ];

    if (!quillReady) {
        return (
            <div className="w-92 h-75 bg-gray-50 border border-[rgb(108,108,108)] rounded-[0.5rem] animate-pulse flex items-center justify-center text-sm text-gray-400">
                Configurando editor...
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col font-sans text-black">
            <div className="quill-wrapper w-full overflow-hidden">
                
               
                <div id="custom-toolbar" className="ql-toolbar ql-snow flex items-center flex-wrap gap-2">
                   
                    <span className="ql-formats">
                        <button type="button" className="ql-bold" />
                        <button type="button" className="ql-italic" />
                        <button type="button" className="ql-underline" />
                        <button type="button" className="ql-strike" />
                    </span>

                   
                    <span 
                        className="ql-formats !mr-2 flex items-center gap-1 bg-white  rounded-md px-1.5 py-0.5"
                        onMouseDown={() => {
                            const editor = quillRef.current?.getEditor();
                            if (editor) {
                                const sel = editor.getSelection();
                                if (sel) lastSelectionRef.current = sel;
                            }
                        }}
                    >
                        <span className=" text-gray-500 font-semibold select-none">Tam:</span>
                        <input
                            type="number"
                            min="0"
                            max="120"
                            value={fontSizePx}
                            onChange={(e) => setFontSizePx(Number(e.target.value))}
                            onBlur={(e) => handleApplyFontSize(Number(e.target.value))}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault(); 
                                    handleApplyFontSize(fontSizePx);
                                }
                            }}
                            className="w-11 text-center  font-medium border-0 focus:outline-none focus:ring-0 p-0 text-black bg-transparent"
                            title="Pressione Enter ou saia do campo para aplicar o tamanho"
                        />
                        <span className=" text-gray-400 select-none">px</span>
                    </span>

                    
                    <span className="ql-formats">
                        <select className="ql-header" defaultValue="">
                            <option value="2">Título 2</option>
                            <option value="3">Título 3</option>
                            <option value="4">Título 4</option>
                            <option value="">Normal</option>
                        </select>
                    </span>

              
                    <span className="ql-formats">
                        <button type="button" className="ql-list" value="ordered" />
                        <button type="button" className="ql-list" value="bullet" />
                    </span>

                    
                    <span className="ql-formats">
                        <select className="ql-align" defaultValue="" />
                    </span>

                   
                    <span className="ql-formats">
                        <select className="ql-color" defaultValue="">
                            {CORES_PRINCIPAIS.map((cor) => (
                                <option key={cor} value={cor} />
                            ))}
                        </select>
                    </span>

                
                    <span className="ql-formats">
                        <button type="button" className="ql-link" />
                        <button type="button" className="ql-clean" />
                    </span>
                </div>

                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={(val: string, delta: any, source: any, editor: any) => {
                        onChange(val);
                        const sel = editor.getSelection();
                        if (sel) lastSelectionRef.current = sel;
                    }}
                    onChangeSelection={(range: any) => {
                        if (range) lastSelectionRef.current = range;
                    }}
                    modules={modules}
                    formats={formats}
                    placeholder="Comece a escrever o corpo do seu post..."
                    className="bg-white rounded-[0.5rem] w-full text-black"
                />
            </div>

            <style jsx global>{`
                .quill-wrapper .ql-toolbar.ql-snow {
                    border: 0.0625rem solid rgb(108, 108, 108) !important;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    background-color: rgb(249, 250, 251);
                    padding: 0.5rem !important;
                    display: flex !important;
                    align-items: center;
                    flex-wrap: wrap !important;
                    width: 100% !important;
                }

                .quill-wrapper .ql-container.ql-snow {
                    border: 0.0625rem solid rgb(108, 108, 108) !important;
                    border-top: none !important;
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                    min-height: 90vh;
                    max-height: 90vh;
                    overflow-y: auto;
                    font-family: ui-sans-serif, system-ui, sans-serif;
                    font-size: 1rem;
                    width: 100% !important;
                }

                .quill-wrapper .ql-editor {
                    color: #000000 !important;
                    white-space: pre-wrap !important;
                    word-break: break-word !important;
                    overflow-wrap: break-word !important;
                }

                .quill-wrapper .ql-editor .ql-align-justify { text-align: justify !important; }
                .quill-wrapper .ql-editor .ql-align-center { text-align: center !important; }
                .quill-wrapper .ql-editor .ql-align-right { text-align: right !important; }
                .quill-wrapper .ql-editor .ql-align-left { text-align: left !important; }

                .quill-wrapper .ql-snow.ql-toolbar button:hover .ql-stroke,
                .quill-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke,
                .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
                .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke {
                    stroke: rgb(135, 36, 14) !important;
                }

                .quill-wrapper .ql-snow.ql-toolbar button:hover .ql-fill,
                .quill-wrapper .ql-snow.ql-toolbar button.ql-active .ql-fill,
                .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
                .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill {
                    fill: rgb(135, 36, 14) !important;
                }
            `}</style>
        </div>
    );
}