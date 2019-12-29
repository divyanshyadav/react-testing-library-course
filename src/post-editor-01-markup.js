import React, { useState } from 'react'
import { savePost } from './api'

function Editor({ user }) {
  const [ isSaving, setIsSaving ] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    const { title, content, tags } = e.target.elements

    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id
    })
  }

  return (
    <form onSubmit={handleSubmit} >
      <label htmlFor="title-input">title</label>
      <input id="title-input" type='text' name='title' />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" type='text' name='content' />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" type='text' name='tags' />

      <button type='submit' disabled={isSaving}>Submit</button>

    </form>
  )
}

export { Editor }