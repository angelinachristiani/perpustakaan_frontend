import { useEffect, useState } from 'react';
import API from '../services/api';

export default function DashboardLagu() {
  const [songs, setSongs] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '', file: null });

  useEffect(() => {
    API.get('/songs').then(res => setSongs(res.data));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('artist', form.artist);
    data.append('file', form.file);

    try {
      await API.post('/songs', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

      alert('✅ Lagu berhasil diupload!');
      setForm({ title: '', artist: '', file: null });
      const res = await API.get('/songs');
      setSongs(res.data);
    } catch {
      alert('❌ Gagal upload lagu.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus lagu?')) {
      await API.delete(`/songs/${id}`);
      setSongs(songs.filter(s => s.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">🎵 Kelola Lagu</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Judul Lagu" required className="p-2 border rounded" />
        <input name="artist" value={form.artist} onChange={handleChange} placeholder="Artis" required className="p-2 border rounded" />
        <input name="file" type="file" onChange={handleChange} accept="audio/*" className="p-2 border rounded" />
        <button type="submit" className="py-2 text-white bg-purple-600 rounded">Upload Lagu</button>
      </form>

      <ul>
        {songs.map(song => (
          <li key={song.id} className="mb-3">
            <strong>{song.title}</strong> - {song.artist}<br />
            <audio controls src={song.file_url} className="mt-1" />
            <button onClick={() => handleDelete(song.id)} className="mt-1 text-sm text-red-500">Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
