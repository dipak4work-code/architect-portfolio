import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'architect-site-data-react';

const defaultData = {
  about:
    'Experienced architect with 15+ years designing luxury homes, boutique hotels, and urban offices. Our practice is rooted in Indian traditions, contemporary sustainability, and human-centered craft.',
  services: [
    {
      title: 'Architecture Design',
      description: 'End-to-end residential and commercial architecture with context-aware planning.'
    },
    {
      title: 'Interior Design',
      description: 'Elegant interiors crafted for local climate, materiality, and lifestyle.'
    },
    {
      title: 'Project Consultation',
      description: 'Feasibility studies, BUA estimation, cost planning and vendor coordination.'
    }
  ],
  projects: [
    {
      title: 'Office Executive Desk',
      category: 'Office',
      description: 'Minimal executive cabin with wood and glass accents.',
      image:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Project Workspace Layout',
      category: 'Office',
      description: 'Collaborative workspace with ergonomic seating and ambient lighting.',
      image:
        'https://images.unsplash.com/photo-1528230121233-8f2f7f6f98b9?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Office Reception Zone',
      category: 'Office',
      description: 'Inviting reception with sleek cabinetry and sculptured panels.',
      image:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Management Lounge',
      category: 'Office',
      description: 'Executive lounge with a refined mix of materials and lighting.',
      image:
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Living Room Concept',
      category: 'House',
      description: 'Spacious living area with warm wood textures and art pieces.',
      image:
        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Lounge and TV Wall',
      category: 'House',
      description: 'Smooth transition between seating and entertainment zones.',
      image:
        'https://images.unsplash.com/photo-1549187774-b4e9cfa1072f?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Bedrooms Interior',
      category: 'House',
      description: 'Elegant bedroom with soft furnishings and practical storage.',
      image:
        'https://images.unsplash.com/photo-1521510895913-0c8d86bb2e8e?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Kitchen and Dining',
      category: 'House',
      description: 'Open-concept kitchen with contemporary cabinetry and lighting.',
      image:
        'https://images.unsplash.com/photo-1505691723518-34d82ea0f3de?auto=format&fit=crop&w=1600&q=80'
    }
  ]
};

function getStorageData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultData;
  try {
    const parsed = JSON.parse(raw);
    return {
      about: parsed.about || defaultData.about,
      services: parsed.services || defaultData.services,
      projects: parsed.projects || defaultData.projects
    };
  } catch (err) {
    return defaultData;
  }
}

function App() {
  const [data, setData] = useState(defaultData);
  const [mode, setMode] = useState('public');
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState({ open: false, src: '' });

  useEffect(() => {
    setData(getStorageData());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return data.projects;
    return data.projects.filter((project) => project.category === filter);
  }, [data.projects, filter]);

  const saveAbout = (aboutText) => setData((prev) => ({ ...prev, about: aboutText }));
  const saveServices = (services) => setData((prev) => ({ ...prev, services }));
  const saveProjects = (projects) => setData((prev) => ({ ...prev, projects }));

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container nav-wrap">
          <button className="brand" type="button" onClick={() => setMode('public')}>
            Aarav Architect
          </button>
          <nav>
            <ul className="menu">
              <li>
                <button onClick={() => setMode('public')} className={mode === 'public' ? 'active' : ''}>
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => setMode('admin')} className={mode === 'admin' ? 'active' : ''}>
                  Admin
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {mode === 'public' ? (
        <main>
          <section className="hero section">
            <div className="container hero-content">
              <p className="eyebrow">Indian Architectural Design Studio</p>
              <h1>Modern aesthetics. Sustainable spaces. Enduring value.</h1>
              <p>{data.about}</p>
              <button className="btn primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Book a consultation
              </button>
            </div>
          </section>

          <section className="section about" id="about">
            <div className="container">
              <h2>About</h2>
              <p>{data.about}</p>
            </div>
          </section>

          <section className="section services" id="services">
            <div className="container">
              <h2>Services</h2>
              <div className="grid service-grid">
                {data.services.map((service) => (
                  <article className="card" key={service.title}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section projects" id="projects">
            <div className="container">
              <div className="section-head">
                <h2>Selected Projects</h2>
                <div className="project-filter" role="group">
                  {['all', 'Office', 'House', 'Residential', 'Commercial', 'Interior'].map((cat) => (
                    <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid projects-grid">
                {filteredProjects.map((project, index) => (
                  <article key={`${project.title}-${index}`} className="project-card" onClick={() => setLightbox({ open: true, src: project.image })}>
                    <img className="project-image" src={project.image} alt={project.title} loading="lazy" />
                    <div className="project-overlay" />
                    <div className="project-info">
                      <small>{project.category}</small>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section contact" id="contact">
            <div className="container">
              <h2>Contact</h2>
              <p>Start a project with us. We respond within 24 hours.</p>
              <div className="contact-grid">
                <div className="contact-info">
                  <p><strong>Email:</strong> hello@aaravarchitect.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Location:</strong> Mumbai, India</p>
                </div>
                <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent locally.'); e.currentTarget.reset(); }}>
                  <input type="text" name="name" placeholder="Your Name" required />
                  <input type="email" name="email" placeholder="Your Email" required />
                  <textarea name="message" rows="5" placeholder="Your Message" required />
                  <button type="submit" className="btn primary">Send Message</button>
                </form>
              </div>
            </div>
          </section>

          {lightbox.open && (
            <div className="lightbox show" onClick={() => setLightbox({ open: false, src: '' })}>
              <button className="lightbox-close">✕</button>
              <img src={lightbox.src} alt="project" />
            </div>
          )}
        </main>
      ) : (
        <main className="section admin-section">
          <div className="container">
            <h1>Admin Dashboard</h1>
            <p>Manage content and projects. Changes are saved to localStorage.</p>
            <section className="admin-card">
              <h2>About Content</h2>
              <textarea value={data.about} onChange={(e) => saveAbout(e.target.value)} rows={4} />
            </section>

            <section className="admin-card">
              <h2>Services</h2>
              <textarea
                value={data.services.map((s) => `${s.title} | ${s.description}`).join('\n')}
                onChange={(e) => {
                  const lines = e.target.value.split('\n').filter(Boolean);
                  const newServices = lines.map((line) => {
                    const [title, desc] = line.split('|').map((t) => t.trim());
                    return { title: title || 'Service', description: desc || '' };
                  });
                  saveServices(newServices);
                }}
                rows={6}
              />
            </section>

            <section className="admin-card">
              <h2>Projects</h2>
              <ProjectEditor projects={data.projects} onSave={saveProjects} />
            </section>

            <section className="admin-card">
              <h2>Data Preview</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </section>
          </div>
        </main>
      )}

      <footer className="site-footer">
        <div className="container">&copy; 2026 Aarav Architect Studio.</div>
      </footer>
    </div>
  );
}

function ProjectEditor({ projects, onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Office');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const clearForm = () => {
    setTitle('');
    setCategory('Office');
    setDescription('');
    setImage('');
    setEditIndex(-1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !description || (editIndex === -1 && !image)) return;

    const saveProject = (imgSrc) => {
      const updated = [...projects];
      const project = { title, category, description, image: imgSrc || (editIndex >= 0 ? projects[editIndex].image : '') };
      if (editIndex >= 0) {
        updated[editIndex] = project;
      } else {
        updated.unshift(project);
      }
      onSave(updated);
      clearForm();
    };

    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = (ev) => saveProject(ev.target.result);
      reader.readAsDataURL(image);
    } else {
      saveProject(image);
    }
  };

  return (
    <>
      <form className="admin-form" onSubmit={onSubmit}>
        <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" value={category} placeholder="Category" onChange={(e) => setCategory(e.target.value)} required />
        <textarea value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} rows={3} required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="btn primary">{editIndex >= 0 ? 'Update' : 'Add'} Project</button>
        <button type="button" className="btn secondary" onClick={clearForm}>Clear</button>
      </form>
      <div className="admin-list">
        {projects.map((project, idx) => (
          <div className="admin-item" key={`${project.title}-${idx}`}>
            <div>
              <strong>{project.title}</strong>
              <p className="item-meta">{project.category} · {project.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => {
                setEditIndex(idx);
                setTitle(project.title);
                setCategory(project.category);
                setDescription(project.description);
                setImage(project.image);
              }} className="btn secondary">Edit</button>
              <button onClick={() => onSave(projects.filter((_, i) => i !== idx))} className="btn" style={{ background: '#ec4c47', color: '#fff', borderColor: '#ec4c47' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
