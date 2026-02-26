import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Navbar({ onNewPost }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast('またね 👋')
    navigate('/login')
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'rgba(18,16,14,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-night-border)',
    }}>
      {/* Top vermillion accent line */}
      <div style={{ height: '2px', background: 'linear-gradient(to right, var(--color-vermillion), transparent)' }} />

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-washi)', letterSpacing: '0.12em' }}>
            私の日記
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.55rem', color: 'var(--color-stone)', letterSpacing: '0.25em', marginTop: '0.2rem' }}>
            個人の記録
          </span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* User chip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--color-night-card)', padding: '0.375rem 0.75rem',
            border: '1px solid var(--color-night-border)', borderRadius: '2px',
          }}>
            <div style={{
              width: '22px', height: '22px', borderRadius: '50%',
              background: 'var(--color-vermillion)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-washi)',
            }}>
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-stone-light)' }}>
              {user?.username}
            </span>
          </div>

          <button onClick={onNewPost} className="btn-primary" style={{ fontSize: '0.8rem' }}>
            <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            新しい記録
          </button>

          <button onClick={handleLogout} title="ログアウト" style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '0.375rem',
            color: 'var(--color-stone)', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-vermillion)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-stone)'}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
