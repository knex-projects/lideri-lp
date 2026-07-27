'use client';
import type { RichTextEditorProps } from '@/src/types';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';


const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => (
        <div className="w-92 h-75 bg-gray-50 border border-[rgb(108,108,108)] rounded-[0.5rem] animate-pulse flex items-center justify-center text-sm text-gray-400">
            Carregando editor...
        </div>
    )
});

import 'react-quill-new/dist/quill.snow.css';



export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const [quillReady, setQuillReady] = useState(false);
    const CORES_PRINCIPAIS = ['#000000', '#ffffff', '#87240E', '#6C6C6C', '#F9FAFB','#1A3A8C','#680000'];

   
    useEffect(() => {
        if (typeof window !== 'undefined') {
            
            import('quill').then((QuillModule) => {
                const Quill = QuillModule.default;
                const Size = Quill.import('attributors/style/size') as any;

               Size.whitelist = ['0.875rem', '1rem', '1.5rem', '2rem', '3rem', '4rem'];
                Quill.register(Size, true);

                setQuillReady(true); 
            });
        }
    }, []);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
        [{ 'size': ['0.875rem', '1rem', '1.5rem', '2rem', '3rem', '4rem'] }],
            [{ 'header': [2, 3, 4, false] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            [{ 'align': [] }],
            [{'color': CORES_PRINCIPAIS}],
            ['clean']
        ],
    };

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
        <div className="w-full max-w-[] min-w-0 flex flex-col font-sans text-black">

            <div className="quill-wrapper w-full min-w-0 overflow-hidden">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={onChange}
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
          flex-wrap: wrap !important;
          width: 100% !important;
        }

        .quill-wrapper .ql-editor .ql-align-justify {
        text-align: justify !important;
         color: rgb(135, 36, 14) !important;
        }
        .quill-wrapper .ql-editor .ql-align-center {
        text-align: center !important;
         color: rgb(135, 36, 14) !important;
        }
        .quill-wrapper .ql-editor .ql-align-right {
        text-align: right !important;
        }
        .quill-wrapper .ql-editor .ql-align-left {
        text-align: left !important;
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

        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-options .ql-picker-item::before {
        content: attr(data-value) !important;
        }

        
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-label::before {
        content: 'Tamanho' !important;
        }

        
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.875rem"]::before { content: '0.875rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1rem"]::before { content: '1rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1.5rem"]::before { content: '1.5rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="2rem"]::before { content: '2rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="3rem"]::before { content: '3rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="4rem"]::before { content: '4rem' !important; }

        
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-options .ql-picker-item[data-value="0.875rem"]::before { content: '0.875rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-options .ql-picker-item[data-value="1rem"]::before { content: '1rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-options .ql-picker-item[data-value="1.5rem"]::before { content: '1.5rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-options .ql-picker-item[data-value="2rem"]::before { content: '2rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-options .ql-picker-item[data-value="3rem"]::before { content: '3rem' !important; }
        .quill-wrapper .ql-snow .ql-picker.ql-size .ql-picker-options .ql-picker-item[data-value="4rem"]::before { content: '4rem' !important; }

       
        .quill-wrapper .ql-snow.ql-toolbar button:hover,
        .quill-wrapper .ql-snow .ql-toolbar button:hover,
        .quill-wrapper .ql-snow.ql-toolbar button.ql-active,
        .quill-wrapper .ql-snow .ql-toolbar button.ql-active,
        .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover,
        .quill-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover,
        .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active,
        .quill-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active {
        color: rgb(135, 36, 14) !important;
        }


       
        .quill-wrapper .ql-snow .ql-picker .ql-picker-options .ql-picker-item:hover,
         .quill-wrapper .ql-snow .ql-picker .ql-picker-options .ql-picker-item:hover .ql-stroke
         {  color: rgb(135, 36, 14) !important; 
            stroke: rgb(135, 36, 14) !important;
         }
        
       
        
        .quill-wrapper .ql-snow.ql-toolbar button:hover .ql-stroke,
        .quill-wrapper .ql-snow .ql-toolbar button:hover .ql-stroke,
        .quill-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .quill-wrapper .ql-snow .ql-toolbar button.ql-active .ql-stroke,
        .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
        .quill-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
         .quill-wrapper .ql-snow.ql-toolbar .ql-picker-options.ql-active .ql-stroke,
        .quill-wrapper .ql-snow .ql-toolbar .ql-picker-options:hover .ql-stroke,
        .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .quill-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke {
        stroke: rgb(135, 36, 14) !important;
        }

        
        .quill-wrapper .ql-snow.ql-toolbar button:hover .ql-fill,
        .quill-wrapper .ql-snow .ql-toolbar button:hover .ql-fill,
        .quill-wrapper .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .quill-wrapper .ql-snow .ql-toolbar button.ql-active .ql-fill,
        .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
        .quill-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
        .quill-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .quill-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill {
        stroke: rgb(135, 36, 14) !important;
        }

        
        .quill-wrapper .ql-snow.ql-toolbar .ql-picker-options {
        border-color: rgb(108, 108, 108) !important;
       
        }

       
        .quill-wrapper .ql-snow .ql-color-picker .ql-picker-options {
        opacity: 0 !important;
        stroke: rgb(135, 36, 14) !important;
        transform: translateY(0.625rem) !important;
        transition: opacity 0.2s ease, transform 0.2s ease !important;
        pointer-events: none !important; 
        
        
        flex-wrap: wrap !important;
        gap: 0.375rem !important;
        padding: 0.5rem !important;
        max-width: 8.75rem !important;
        background-color: white !important;
        border-radius: 0.375rem !important;
        border: 0.0625rem solid rgb(108, 108, 108) !important;
        box-shadow: 0 0.625rem 0.9375rem -0.1875rem rgb(0 0 0 / 0.1), 0 0.25rem 0.375rem -0.25rem rgb(0 0 0 / 0.1);
        }

        
        .quill-wrapper .ql-snow .ql-color-picker.ql-expanded .ql-picker-options {
        display: flex !important;           
        opacity: 1 !important;              
        transform: translateY(0) !important; 
        pointer-events: auto !important;    
        }

        
        .quill-wrapper .ql-snow .ql-color-picker .ql-picker-item {
        width: 1.25rem !important;
        height: 1.25rem !important;
        border-radius: 0.25rem !important;
        border: 0.0625rem solid #e5e7eb !important;
        cursor: pointer !important;
        transition: transform 0.1s ease !important; 
        }

        
        .quill-wrapper .ql-snow .ql-color-picker .ql-picker-item:hover {
        border-color: rgb(135, 36, 14) !important;
        transform: scale(1.1) !important;
        }

      `}</style>
        </div>
    );
}