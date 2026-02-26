import { useRef } from 'react'

export default function DeleteModal({ post, onConfirm, onClose }) {
  const overlayRef = useRef(null)
  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        padding: '1rem', animation: 'var(--animate-fade-in)',
      }}>
      <div style={{
        background: 'var(--color-night-card)',
        border: '1px solid var(--color-night-border)',
        borderTop: '2px solid var(--color-vermillion)',
        borderRadius: '2px', maxWidth: '380px', width: '100%',
        padding: '1.5rem', animation: 'var(--animate-slide-up)',
        boxShadow: 'var(--shadow-lifted)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
            background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-vermillion)', marginTop: '2px',
          }}>
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-washi)', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>
              記録を削除しますか？
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-stone)', lineHeight: 1.7 }}>
              「<span style={{ color: 'var(--color-washi)' }}>{post.title}</span>」を完全に削除します。この操作は元に戻せません。
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onClose} className="btn-ghost">キャンセル</button>
          <button onClick={onConfirm} style={{
            background: 'var(--color-vermillion)', color: 'var(--color-washi)',
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.85rem',
            padding: '0.5rem 1.25rem', borderRadius: '2px', border: 'none',
            cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.05em',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-vermillion-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-vermillion)'}
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  )
}
