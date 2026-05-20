import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none prose-pre:bg-translucent prose-pre:border prose-pre:border-translucent prose-pre:rounded-xl">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
