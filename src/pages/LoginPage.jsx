import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form,    setForm]    = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [show,    setShow]    = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form)
      toast.success('ようこそ')
      navigate('/')
    } catch (err) {
      toast.error(err?.response?.data?.error ?? 'ログインに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--color-night)' }}>

      {/* Left decorative panel */}
      <aside style={{
        width: '340px', flexShrink: 0,
        background: 'linear-gradient(160deg, #1C1814 0%, #12100E 100%)',
        borderRight: '1px solid var(--color-night-border)',
        padding: '3rem 2.5rem',
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }} className="left-panel">

        {/* Vertical red line accent */}
        <div style={{
          position: 'absolute', left: 0, top: 0, width: '3px', height: '100%',
          background: 'linear-gradient(to bottom, var(--color-vermillion), transparent 70%)',
        }} />

        {/* Decorative kanji watermark */}
        <div style={{
          position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
          fontSize: '220px', fontFamily: 'var(--font-serif)', color: 'rgba(192,57,43,0.04)',
          lineHeight: 1, userSelect: 'none', letterSpacing: '-0.05em',
        }}>日記</div>

        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-washi)', letterSpacing: '0.1em' }}>
            私の日記
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--color-stone)', letterSpacing: '0.25em', marginTop: '0.375rem', textTransform: 'uppercase' }}>
            個人の記録
          </div>
        </div>

        <blockquote style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'rgba(192,57,43,0.3)', lineHeight: 1, marginBottom: '0.5rem' }}>「</div>
          <p style={{ fontFamily: 'var(--font-serif)', color: 'rgba(242,237,228,0.7)', lineHeight: 1.9, fontSize: '0.95rem' }}>
            日記は嘘をつかない鏡である。
          </p>
          <footer style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', marginTop: '1rem', letterSpacing: '0.15em' }}>
            ─ 無名
          </footer>
        </blockquote>

        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'rgba(107,92,82,0.5)', letterSpacing: '0.2em' }}>
          {new Date().getFullYear()}年 · 個人日記
        </div>
      </aside>

      {/* Form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '380px', animation: 'var(--animate-fade-in)' }}>

          {/* Mobile logo */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-washi)', letterSpacing: '0.15em' }}>
              私の日記
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', letterSpacing: '0.25em', marginTop: '0.25rem' }}>
              個人の記録
            </div>
          </div>

          {/* Red divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ height: '1px', flex: 1, background: 'var(--color-night-border)' }} />
            <div style={{ width: '6px', height: '6px', background: 'var(--color-vermillion)', borderRadius: '50%' }} />
            <div style={{ height: '1px', flex: 1, background: 'var(--color-night-border)' }} />
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-washi)', marginBottom: '0.375rem', letterSpacing: '0.05em' }}>
            ログイン
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-stone)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
            日記を開くにはログインしてください
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.15em' }}>
                メールアドレス
              </label>
              <input type="email" required autoComplete="email" value={form.email}
                onChange={set('email')} placeholder="example@mail.com" className="input-field" />
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.15em' }}>
                パスワード
              </label>
              <div style={{ position: 'relative' }}>
                <input type={show ? 'text' : 'password'} required autoComplete="current-password"
                  value={form.password} onChange={set('password')} placeholder="••••••••"
                  className="input-field" style={{ paddingRight: '2.75rem' }} />
                <button type="button" tabIndex={-1} onClick={() => setShow(s => !s)} style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--color-stone)', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}>
                  {show
                    ? <svg style={{width:'16px',height:'16px'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    : <svg style={{width:'16px',height:'16px'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  }
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
              {loading ? '処理中…' : 'ログインする'}
            </button>
          </form>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-stone)', textAlign: 'center', marginTop: '1.5rem' }}>
            アカウントをお持ちでない方は{' '}
            <Link to="/register" style={{ color: 'var(--color-vermillion)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              新規登録
            </Link>
          </p>
        </div>
      </div>

      <style>{`.left-panel { display: none; } @media(min-width: 1024px){ .left-panel { display: flex !important; } }`}</style>
    </div>
  )
}
