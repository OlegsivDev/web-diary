import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { createPost, updatePost } from '../api'

const MOODS = [
  { emoji: '😊', label: '良い気分', val: '😊 Хорошо' },
  { emoji: '🥰', label: '最高',     val: '🥰 Отлично' },
  { emoji: '🎉', label: '嬉しい',   val: '🎉 Радость' },
  { emoji: '😐', label: '普通',     val: '😐 Нейтрально' },
  { emoji: '🤔', label: '考え中',   val: '🤔 Задумчиво' },
  { emoji: '😴', label: '疲れた',   val: '😴 Устал' },
  { emoji: '😢', label: '悲しい',   val: '😢 Грустно' },
  { emoji: '😤', label: 'イライラ', val: '😤 Раздражён' },
]

export default function PostModal({ post, onClose, onSaved }) {
  const isEdit = !!post
  const [title,   setTitle]   = useState(post?.title   ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [mood,    setMood]    = useState(post?.mood    ?? '')
  const [loading, setLoading] = useState(false)
  const overlayRef = useRef(null)
  const titleRef   = useRef(null)
  const today = format(new Date(), 'yyyy年M月d日（EEEE）', { locale: ja })

  useEffect(() => { titleRef.current?.focus() }, [])
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) { toast.error('タイトルと内容を入力してください'); return }
    setLoading(true)
    try {
      if (isEdit) {
        const res = await updatePost(post.id, { title, content, mood })
        onSaved(res.data, 'update')
        toast.success('記録を更新しました')
      } else {
        const res = await createPost({ title, content, mood })
        onSaved(res.data, 'create')
        toast.success('記録を追加しました')
      }
      onClose()
    } catch (err) {
      toast.error(err?.response?.data?.error ?? 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        animation: 'var(--animate-fade-in)', padding: '0',
      }}>
      <div style={{
        width: '100%', maxWidth: '680px', maxHeight: '95vh', overflowY: 'auto',
        background: 'var(--color-night-card)',
        border: '1px solid var(--color-night-border)',
        borderTop: '2px solid var(--color-vermillion)',
        borderRadius: '4px 4px 0 0',
        animation: 'var(--animate-slide-up)',
        display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-lifted)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid var(--color-night-border)' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--color-washi)', letterSpacing: '0.05em' }}>
              {isEdit ? '記録を編集' : '新しいページ'}
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{today}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-stone)', padding: '0.25rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-washi)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-stone)'}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem 1.5rem 1.5rem', gap: '1.125rem' }}>

          {/* Title */}
          <div>
            <input ref={titleRef} type="text" placeholder="タイトル…" value={title}
              onChange={e => setTitle(e.target.value)} maxLength={200}
              style={{
                width: '100%', background: 'transparent',
                borderBottom: '1px solid var(--color-night-border)',
                borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                outline: 'none', fontFamily: 'var(--font-serif)', fontSize: '1.4rem',
                color: 'var(--color-washi)', padding: '0.25rem 0', letterSpacing: '0.03em',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderBottomColor = 'var(--color-vermillion)'}
              onBlur={e => e.target.style.borderBottomColor = 'var(--color-night-border)'}
            />
            <div style={{ textAlign: 'right', fontFamily: 'var(--font-sans)', fontSize: '0.6rem', color: 'var(--color-stone)', marginTop: '0.25rem', opacity: 0.5 }}>{title.length}/200</div>
          </div>

          {/* Mood */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', letterSpacing: '0.15em', marginBottom: '0.625rem' }}>気分</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {MOODS.map(m => {
                const sel = mood === m.val
                return (
                  <button key={m.val} type="button" onClick={() => setMood(sel ? '' : m.val)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.3rem 0.75rem', borderRadius: '2px', fontSize: '0.75rem',
                      fontFamily: 'var(--font-sans)', cursor: 'pointer', transition: 'all 0.15s',
                      background: sel ? 'var(--color-vermillion)' : 'rgba(255,255,255,0.04)',
                      border: sel ? '1px solid var(--color-vermillion)' : '1px solid var(--color-night-border)',
                      color: sel ? 'var(--color-washi)' : 'var(--color-stone-light)',
                    }}>
                    <span>{m.emoji}</span><span>{m.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <textarea placeholder="今日はどんな一日でしたか？…" value={content}
            onChange={e => setContent(e.target.value)} rows={9}
            className="ruled-lines"
            style={{
              width: '100%', background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--color-night-border)', borderRadius: '2px',
              outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.875rem',
              color: 'rgba(242,237,228,0.85)', lineHeight: '2rem', padding: '0.75rem 1rem',
              resize: 'none', transition: 'border-color 0.2s', letterSpacing: '0.03em',
              backgroundPosition: '0 12px', backgroundSize: '100% 32px',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--color-vermillion)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-night-border)'}
          />

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', opacity: 0.5 }}>
              {content.length > 0 ? `${content.length}文字` : ''}
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" onClick={onClose} className="btn-ghost">キャンセル</button>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? '保存中…' : isEdit ? '保存する' : '記録を追加'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
