import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

const MOOD_JP = {
  '😊 Хорошо':      '😊 良い気分',
  '🥰 Отлично':     '🥰 最高',
  '🎉 Радость':     '🎉 嬉しい',
  '😐 Нейтрально':  '😐 普通',
  '🤔 Задумчиво':   '🤔 考え中',
  '😴 Устал':       '😴 疲れた',
  '😢 Грустно':     '😢 悲しい',
  '😤 Раздражён':   '😤 イライラ',
}

export default function PostCard({ post, onEdit, onDelete, index = 0 }) {
  const date    = new Date(post.createdAt)
  const dayNum  = format(date, 'd')
  const month   = format(date, 'M月', { locale: ja })
  const year    = format(date, 'yyyy年')
  const weekday = format(date, 'EEEE', { locale: ja })
  const time    = format(date, 'HH:mm')
  const edited  = post.updatedAt !== post.createdAt
  const mood    = MOOD_JP[post.mood] || post.mood

  return (
    <article
      className="card"
      style={{
        animation: 'var(--animate-reveal)',
        animationDelay: `${index * 70}ms`,
        animationFillMode: 'both',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => e.currentTarget.querySelector('.post-actions').style.opacity = '1'}
      onMouseLeave={e => e.currentTarget.querySelector('.post-actions').style.opacity = '0'}
    >
      {/* Left red accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '2px', height: '100%',
        background: 'linear-gradient(to bottom, var(--color-vermillion), transparent)',
        opacity: 0.6,
      }} />

      <div className="ruled-lines" style={{ padding: '1.25rem 1.5rem 1.25rem 2rem', position: 'relative' }}>

        {/* Date strip */}
        <div style={{
          position: 'absolute', left: '0.5rem', top: '1.25rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', width: '1rem',
        }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-vermillion)', lineHeight: 1 }}>{dayNum}</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5rem', color: 'var(--color-stone)', letterSpacing: '0.05em', writingMode: 'vertical-rl' }}>{month}</span>
        </div>

        <div style={{ paddingLeft: '1.25rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.625rem' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-washi)', lineHeight: 1.5, marginBottom: '0.3rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {post.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', letterSpacing: '0.08em' }}>
                  {year} {weekday} {time}
                </span>
                {edited && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', color: 'var(--color-stone)', opacity: 0.6, fontStyle: 'italic' }}>編集済み</span>}
                {mood && (
                  <span style={{
                    background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)',
                    padding: '0.1rem 0.5rem', borderRadius: '2px',
                    fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-vermillion-light)',
                  }}>
                    {mood}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="post-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: 0, transition: 'opacity 0.2s', flexShrink: 0 }}>
              <button onClick={() => onEdit(post)} title="編集" style={{
                padding: '0.375rem', borderRadius: '2px', background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--color-stone)', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-washi)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-stone)'; e.currentTarget.style.background = 'none' }}
              >
                <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                </svg>
              </button>
              <button onClick={() => onDelete(post)} title="削除" style={{
                padding: '0.375rem', borderRadius: '2px', background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--color-stone)', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-vermillion)'; e.currentTarget.style.background = 'rgba(192,57,43,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-stone)'; e.currentTarget.style.background = 'none' }}
              >
                <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(242,237,228,0.6)',
            lineHeight: 1.85, overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', whiteSpace: 'pre-line',
          }}>
            {post.content}
          </p>
        </div>
      </div>
    </article>
  )
}
