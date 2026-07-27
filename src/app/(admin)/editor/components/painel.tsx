'use client';

import type { PainelProps } from '@/src/types';
import CategoryInput from './categoryImput';
import ImageUpload from './uploadImageCard';
import AudioPlayerUpload from './audioImput';



export default function Painel({
  autoria,
  title,
  categoriasIds,
  imagePreviewUrl,
  audioAssetRef,
  audioLoading,
  imageLoading,
  loading,
  isEditing,
  postStatus,
  scheduledAt,
  onAutoriaChange,
  onTitleChange,
  onCategoriasChange,
  onImageSelect,
  onAudioUploaded,
  setAudioLoading,
  onScheduledAtChange,
  onPublish,
  onSchedule,
  onCancel,
  onClose,
  popup = false,
}: PainelProps) {
  const isBusy = loading || audioLoading || imageLoading;

  return (
    <div className="relative w-full  h-full  bg-white border border-[#2D2D2D] rounded-lg p-6 flex flex-col gap-6 shadow-sm">
      {popup && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Detalhes da publicação</h2>
          <button type="button" onClick={onClose} className="text-sm text-[#87240E] hover:underline">
            Fechar
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-black font-medium text-lg md:text-xl">Título</label>
        <div className="w-full border border-[#6C6C6C] rounded-lg px-4 py-3 bg-white flex items-center">
          <input
            type="text"
            value={title}
            placeholder="Digite o título da publicação"
            onChange={(event) => onTitleChange(event.target.value)}
            className="w-full bg-transparent text-[#111111] font-normal text-base focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-black font-medium text-lg md:text-xl">Autoria</label>
        <div className="w-full border border-[#6C6C6C] rounded-lg px-4 py-3 bg-white flex items-center">
          <input
            type="text"
            value={autoria}
            placeholder="Digite o nome do autor"
            onChange={(event) => onAutoriaChange(event.target.value)}
            className="w-full bg-transparent text-[#111111] font-normal text-base focus:outline-none"
          />
        </div>
      </div>

      <CategoryInput categoriasSelecionadas={categoriasIds} onChangeCategorias={onCategoriasChange} />

      <ImageUpload onImageSelect={onImageSelect} initialPreviewUrl={imagePreviewUrl} />

      <AudioPlayerUpload
        audioAssetRef={audioAssetRef}
        onAudioUploaded={onAudioUploaded}
        audioLoading={audioLoading}
        setAudioLoading={setAudioLoading}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="scheduled-at" className="text-black font-medium text-lg md:text-xl">
          Data de agendamento
        </label>
        <input
          id="scheduled-at"
          type="datetime-local"
          value={scheduledAt}
          onChange={(event) => onScheduledAtChange(event.target.value)}
          className="w-full border border-[#6C6C6C] rounded-lg px-4 py-3 bg-white text-[#111111] focus:outline-none"
        />
        <p className="text-xs text-[#6C6C6C]">Escolha uma data futura para publicar depois.</p>
      </div>

      <hr className="border-[#2D2D2D] my-1" />

      <div className="flex flex-wrap gap-3 w-full">
        {(!isEditing || postStatus === 'draft') && (
          <button
            type="button"
            onClick={onPublish}
            disabled={isBusy}
            className="flex-1 min-w-30 h-12 bg-R5 rounded-[0.5rem] text-N1 font-medium text-sm hover:text-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Publicar agora'}
          </button>
        )}
        <button
          type="button"
          onClick={onSchedule}
          disabled={isBusy}
          className="flex-1 min-w-30 h-12 bg-white border-2 border-[#87240E] rounded-lg text-[#87240E] font-medium text-sm hover:bg-[#87240E] hover:text-white transition-all disabled:opacity-50"
        >
          {loading ? (isEditing ? 'Salvando...' : 'Agendando...') : (isEditing ? 'Salvar alterações' : 'Agendar')}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isBusy}
            className="w-full h-11 text-[#87240E] font-medium text-sm hover:underline disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
