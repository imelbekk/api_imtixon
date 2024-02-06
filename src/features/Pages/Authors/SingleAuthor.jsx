import React, { useEffect, useState } from 'react'
import axiosCleint from '../../../plugins/AxiosCleint'

export default function SingleAuthor() {
  const [authors, setAuthors] = useState('');
  let id = window.location.href.split("/")[4];
  useEffect(() => {
    axiosCleint.get(`/author/${id}`).then((res) => {
      setAuthors(res?.data);
      console.log(authors);
    })
  }, []);
  return (
    <div>
      <img src={books.name} alt="" />
  </div>
  )
}
