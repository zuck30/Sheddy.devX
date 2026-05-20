import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'
import { Post } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff, Upload } from 'lucide-react'
import { slugify } from '@/lib/utils'
import { toast } from 'sonner'
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer'

export function AdminPage() {
  const { user, loading: authLoading, isAdmin } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [_loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // Auth Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user && isAdmin) {
      fetchPosts()
    }
  }, [user, isAdmin])

  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch posts')
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged in successfully')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return

    const postData = {
      ...editingPost,
      updated_at: new Date().toISOString()
    }

    let error
    if (editingPost.id) {
      const { error: err } = await supabase.from('posts').update(postData).eq('id', editingPost.id)
      error = err
    } else {
      const { error: err } = await supabase.from('posts').insert([postData])
      error = err
    }

    if (error) {
      toast.error('Failed to save post')
    } else {
      toast.success('Post saved successfully')
      setEditingPost(null)
      fetchPosts()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete post')
    } else {
      toast.success('Post deleted')
      fetchPosts()
    }
  }

  const handleTitleChange = (title: string) => {
    setEditingPost(prev => ({
      ...prev,
      title,
      slug: prev?.id ? prev.slug : slugify(title)
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    try {
      setIsUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath)

      setEditingPost(prev => ({ ...prev, cover_image: publicUrl }))
      toast.success('Image uploaded successfully')
    } catch (error: any) {
      toast.error('Error uploading image: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  if (authLoading) return <div className="text-center py-20">Loading...</div>

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-20 text-center px-4">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You are logged in as <span className="font-medium text-foreground">{user.email}</span>,
              but you do not have administrative privileges.
            </p>
            <Button variant="outline" onClick={() => supabase.auth.signOut()} className="w-full">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 py-8">
      <div className="flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {!editingPost && (
          <Button onClick={() => setEditingPost({ title: '', content: '', excerpt: '', tags: [], published: false, slug: '' })} className="gap-2">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        )}
      </div>

      {editingPost ? (
        <Card className="glass mx-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editingPost.id ? 'Edit Post' : 'Create New Post'}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                type="button"
              >
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setEditingPost(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {previewMode ? (
                <div className="space-y-8">
                  <div className="aspect-video w-full max-h-64 overflow-hidden rounded-xl glass">
                    {editingPost.cover_image ? (
                      <img src={editingPost.cover_image} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Cover Image</div>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold">{editingPost.title}</h1>
                  <MarkdownRenderer content={editingPost.content || ''} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input value={editingPost.title} onChange={(e) => handleTitleChange(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Slug</label>
                      <Input value={editingPost.slug} onChange={(e) => setEditingPost(prev => ({ ...prev, slug: e.target.value }))} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cover Image</label>
                      <div className="flex gap-2">
                        <Input value={editingPost.cover_image || ''} onChange={(e) => setEditingPost(prev => ({ ...prev, cover_image: e.target.value }))} placeholder="Public URL" />
                        <div className="relative">
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                          <Button type="button" variant="outline" disabled={isUploading}>
                            {isUploading ? '...' : <Upload className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Excerpt</label>
                      <Textarea value={editingPost.excerpt} onChange={(e) => setEditingPost(prev => ({ ...prev, excerpt: e.target.value }))} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags (comma separated)</label>
                      <Input
                          value={editingPost.tags?.join(', ')}
                          onChange={(e) => setEditingPost(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }))}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                          type="checkbox"
                          id="published"
                          checked={editingPost.published}
                          onChange={(e) => setEditingPost(prev => ({ ...prev, published: e.target.checked }))}
                          className="rounded border-translucent bg-translucent"
                      />
                      <label htmlFor="published" className="text-sm font-medium">Published</label>
                    </div>
                  </div>
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <label className="text-sm font-medium">Content (Markdown)</label>
                          <Textarea
                              value={editingPost.content}
                              onChange={(e) => setEditingPost(prev => ({ ...prev, content: e.target.value }))}
                              rows={18}
                              required
                          />
                      </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => setEditingPost(null)}>Cancel</Button>
                <Button type="submit" className="gap-2"><Save className="h-4 w-4" /> Save Post</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 px-4">
          {posts.map(post => (
            <div key={post.id} className="glass p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={post.published ? 'text-green-500' : 'text-yellow-500'}>
                    {post.published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-xs text-muted-foreground">{post.slug} • {new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditingPost(post)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
