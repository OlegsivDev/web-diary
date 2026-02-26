import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getFeed, deletePost } from '../api'
import Navbar      from '../components/Navbar'
import PostCard    from '../components/PostCard'
import PostModal   from '../components/PostModal'
import DeleteModal from '../components/DeleteModal'

const PAGE_SIZE = 10

export default function FeedPage() {
  const [posts,        setPosts]        = useState([])
  const [page,         setPage]         = useState(1)
  const [totalPages,   setTotalPages]   = useState(1)
  const [totalCount,   setTotalCount]   = useState(0)
  const [loading,      setLoading]      = useState(false)
  const [showCreate,   setShowCreate]   = useState(false)
  const [editingPost,  setEditingPost]  = useState(null)
  const [deletingPost, setDeletingPost] = useState(null)

  const fetchPosts = useCallback(async (p = 1) => {
    setLoading(true)
    try {
      const res = await getFeed(p, PAGE_SIZE)
      setPosts(res.data.items)
      setTotalPages(res.data.totalPages)
      setTotalCount(res.data.totalCount)
      setPage(p)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      toast.error('記録の読み込みに失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPosts(1) }, [fetchPosts])

  const handleSaved = (saved, type) => {
    if (type === 'create') {
      if (page === 1) { setPosts(prev => [saved, ...prev].slice(0, PAGE_SIZE)); setTotalCount(c => c + 1) }
      else fetchPosts(1)
    } else {
      setPosts(prev => prev.map(p => p.id === saved.id ? saved : p))
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingPost) return
    try {
      await deletePost(deletingPost.id)
      setPosts(prev => prev.filter(p => p.id !== deletingPost.id))
      setTotalCount(c => c - 1)
      if (posts.length === 1 && page > 1) fetchPosts(page - 1)
      toast.success('記録を削除しました')
    } catch {
      toast.error('削除に失敗しました')
    } finally {
      setDeletingPost(null)
    }
  }

  const isEmpty = !loading && posts.length === 0

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-night)' }}>
      <Navbar onNewPost={() => setShowCreate(true)} />

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1rem' }}>

        {/* Page header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-washi)', letterSpacing: '0.08em', lineHeight: 1 }}>
              記録一覧
            </h1>
            {totalCount > 0 && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-stone)', letterSpacing: '0.15em', marginTop: '0.5rem' }}>
                全 {totalCount} 件 · {page} / {totalPages} ページ
              </p>
            )}
          </div>
          {/* Decorative kanji */}
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'rgba(192,57,43,0.12)', userSelect: 'none', lineHeight: 1 }}>記</span>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ height: '1px', flex: 1, background: 'var(--color-night-border)' }} />
          <div style={{ width: '4px', height: '4px', background: 'var(--color-vermillion)', borderRadius: '50%' }} />
          <div style={{ height: '1px', flex: 1, background: 'var(--color-night-border)' }} />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ height: '110px', background: 'var(--color-night-card)', border: '1px solid var(--color-night-border)', borderRadius: '2px', opacity: 0.5, animation: 'pulse 2s infinite' }} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div style={{ textAlign: 'center', padding: '6rem 0', animation: 'var(--animate-fade-in)' }}>
            <div style={{ fontSize: '3.5rem', opacity: 0.2, marginBottom: '1rem' }}>📓</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-stone-light)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              まだ記録がありません
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-stone)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              毎日の思いを書き留めましょう
            </p>
            <button onClick={() => setShowCreate(true)} className="btn-primary">
              最初の記録を書く
            </button>
          </div>
        )}

        {/* Feed */}
        {!loading && posts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} onEdit={setEditingPost} onDelete={setDeletingPost} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
            <button disabled={page <= 1} onClick={() => fetchPosts(page - 1)} className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: page <= 1 ? 0.3 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>
              <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              前へ
            </button>

            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1
                if (totalPages > 7 && Math.abs(p - page) > 2 && p !== 1 && p !== totalPages) {
                  if (p === 2 || p === totalPages - 1) return <span key={p} style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', padding: '0 0.25rem', alignSelf: 'center' }}>…</span>
                  return null
                }
                return (
                  <button key={p} onClick={() => fetchPosts(p)} style={{
                    width: '32px', height: '32px', borderRadius: '2px', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)', fontSize: '0.8rem', transition: 'all 0.15s',
                    background: p === page ? 'var(--color-vermillion)' : 'transparent',
                    color: p === page ? 'var(--color-washi)' : 'var(--color-stone)',
                  }}
                    onMouseEnter={e => { if (p !== page) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                    onMouseLeave={e => { if (p !== page) e.currentTarget.style.background = 'transparent' }}
                  >{p}</button>
                )
              })}
            </div>

            <button disabled={page >= totalPages} onClick={() => fetchPosts(page + 1)} className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: page >= totalPages ? 0.3 : 1, cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}>
              次へ
              <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </main>

      {showCreate   && <PostModal onClose={() => setShowCreate(false)} onSaved={handleSaved} />}
      {editingPost  && <PostModal post={editingPost} onClose={() => setEditingPost(null)} onSaved={handleSaved} />}
      {deletingPost && <DeleteModal post={deletingPost} onClose={() => setDeletingPost(null)} onConfirm={handleDeleteConfirm} />}
    </div>
  )
}
