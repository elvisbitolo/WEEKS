import React, { useState, useEffect } from 'react';
import { api } from '../api/axiosConfig';

interface Story {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export const HomePage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [filterOwn, setFilterOwn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all stories from the backend server database pipeline
  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/stories');
      setStories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load story timeline registry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Handle submitting a fresh content chapter block
  const handleCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await api.post('/stories', { title, content });
      setTitle('');
      setContent('');
      fetchStories(); // Reload the timeline grid
    } catch (err) {
      alert("Error parsing payload writing schema.");
    }
  };

  const displayedStories = filterOwn 
    ? stories.filter(s => s.authorId === 'current-user-id') // Hardcoded fallback match marker
    : stories;

  return (
    <div className="min-h-screen bg-base-300 text-base-content p-6">
      {/* Header Panel Layout */}
      <header className="flex justify-between items-center max-w-4xl mx-auto mb-8 bg-base-100 p-4 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Collaborative Storytelling</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">My Stories Only</span>
          <input 
            type="checkbox" 
            className="toggle toggle-primary" 
            checked={filterOwn} 
            onChange={(e) => setFilterOwn(e.target.checked)} 
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Story Publishing Submission Form Component */}
        <section className="md:col-span-1 bg-base-100 p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 border-base-200">Draft a Chapter</h2>
          <form onSubmit={handleCreateStory} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Story Title</span></label>
              <input 
                type="text" 
                placeholder="Once upon a time..." 
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Narrative Paragraph</span></label>
              <textarea 
                placeholder="Weave your text string matrix here..." 
                className="textarea textarea-bordered h-32 w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Publish Entry</button>
          </form>
        </section>

        {/* Stories Timeline Feed Component */}
        <section className="md:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-bold opacity-90">Live Chronology</h2>
          {loading ? (
            <div className="flex justify-center p-12"><span className="loading loading-spinner loading-lg text-primary"></span></div>
          ) : displayedStories.length === 0 ? (
            <div className="bg-base-100 p-12 rounded-xl text-center shadow-sm opacity-60">
              No entries compiled onto the ledger yet. Be the first to type!
            </div>
          ) : (
            displayedStories.map((story) => (
              <article key={story.id} className="card bg-base-100 shadow-md border-l-4 border-primary">
                <div className="card-body p-6">
                  <h3 className="card-title text-xl text-secondary">{story.title}</h3>
                  <p className="mt-2 opacity-80 leading-relaxed whitespace-pre-wrap">{story.content}</p>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};