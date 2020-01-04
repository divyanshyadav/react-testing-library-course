import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { savePost } from './api'

function Editor({ user }) {
  const [ isSaving, setIsSaving ] = useState(false)
  const [ redirect, setRedirect ] = useState(false)
  const [ error, setError ] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)

    const { title, content, tags } = e.target.elements
    const newPost = {
      date: new Date().toISOString(),
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id
    }

    savePost(newPost)
      .then(() => setRedirect(true), (res) => {
        const { data } = res

        setError(data.error)
        setIsSaving(false)
      })
  }

  if (redirect) {
    return <Redirect to='/' />
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
      { error ? <div role='alert'>{error}</div> : null }
    </form>
  )
}

export { Editor }