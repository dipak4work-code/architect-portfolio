const STORAGE_KEY = 'architect-site-data';

const defaultData = {
  about: 'Experienced architect with 15+ years designing luxury homes, boutique hotels, and urban offices. Our practice is rooted in Indian traditions, contemporary sustainability, and human-centered craft.',
  services: [
    { title: 'Architecture Design', description: 'End-to-end residential and commercial architecture with context-aware planning.' },
    { title: 'Interior Design', description: 'Elegant interiors crafted for local climate, materiality, and lifestyle.' },
    { title: 'Project Consultation', description: 'Feasibility studies, BUA estimation, cost planning and vendor coordination.' }
  ],
  projects: [
    {
      title: 'Office Executive Desk',
      category: 'Office',
      description: 'Minimal executive cabin with wood and glass accents.',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Project Workspace Layout',
      category: 'Office',
      description: 'Collaborative workspace with ergonomic seating and ambient lighting.',
      image: 'https://images.unsplash.com/photo-1528230121233-8f2f7f6f98b9?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Office Reception Zone',
      category: 'Office',
      description: 'Inviting reception with sleek cabinetry and sculptured panels.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Management Lounge',
      category: 'Office',
      description: 'Executive lounge with a refined mix of materials and lighting.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Living Room Concept',
      category: 'House',
      description: 'Spacious living area with warm wood textures and art pieces.',
      image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Lounge and TV Wall',
      category: 'House',
      description: 'Smooth transition between seating and entertainment zones.',
      image: 'https://images.unsplash.com/photo-1549187774-b4e9cfa1072f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Bedrooms Interior',
      category: 'House',
      description: 'Elegant bedroom with soft furnishings and practical storage.',
      image: 'https://images.unsplash.com/photo-1521510895913-0c8d86bb2e8e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Kitchen and Dining',
      category: 'House',
      description: 'Open-concept kitchen with contemporary cabinetry and lighting.',
      image: 'https://images.unsplash.com/photo-1505691723518-34d82ea0f3de?auto=format&fit=crop&w=1200&q=80'
    }
  ]
};

function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return { ...defaultData, ...parsed };
  } catch (e) {
    console.error('Failed to parse storage', e);
    return defaultData;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderHomepage() {
  const data = getData();

  const aboutText = document.getElementById('aboutText');
  if (aboutText) aboutText.textContent = data.about;

  const servicesList = document.getElementById('servicesList');
  if (servicesList) {
    servicesList.innerHTML = '';
    data.services.forEach(s => {
      const item = document.createElement('article');
      item.className = 'card';
      item.innerHTML = `<h3>${s.title}</h3><p>${s.description}</p>`;
      servicesList.appendChild(item);
    });
  }

  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = '';
    data.projects.forEach((project,index) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.dataset.category = project.category;
      card.innerHTML = `
        <img class="project-image" src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-overlay"></div>
        <div class="project-info">
          <small>${project.category}</small>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        lightboxImage.src = project.image;
        lightbox.classList.add('show');
      });
      projectsGrid.appendChild(card);
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.querySelector('.lightbox-close');
  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('show'));
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.classList.remove('show');
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(button => {
    button.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
      });
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('contactFeedback');
      feedback.textContent = 'Thanks! Your message has been recorded locally (no email backend).';
      contactForm.reset();
    });
  }

  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }
}

function renderAdminPage() {
  const data = getData();
  let editIndex = -1;

  const aboutField = document.getElementById('adminAbout');
  const servicesField = document.getElementById('adminServices');
  const projectList = document.getElementById('projectList');
  const jsonPreview = document.getElementById('jsonPreview');

  if (aboutField) aboutField.value = data.about;
  if (servicesField) servicesField.value = data.services.map(s => `${s.title} | ${s.description}`).join('\n');

  function updateJsonPreview() {
    if (jsonPreview) {
      jsonPreview.textContent = JSON.stringify(data, null, 2);
    }
  }

  function resetProjectInputs() {
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectCategory').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectImage').value = '';
    editIndex = -1;
    document.getElementById('projectStatus').textContent = 'Ready to add new project.';
  }

  function drawProjects() {
    projectList.innerHTML = '';
    data.projects.forEach((project, index) => {
      const row = document.createElement('div');
      row.className = 'admin-item';
      row.innerHTML = `
        <div>
          <strong>${project.title}</strong>
          <p class="item-meta">${project.category} &middot; ${project.description}</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" data-index="${index}" class="edit-btn">Edit</button>
          <button type="button" data-index="${index}" class="delete-btn">Delete</button>
        </div>
      `;

      row.querySelector('.delete-btn').addEventListener('click', () => {
        data.projects.splice(index, 1);
        saveData(data);
        drawProjects();
        updateJsonPreview();
      });

      row.querySelector('.edit-btn').addEventListener('click', () => {
        editIndex = index;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectStatus').textContent = 'Edit mode: updating project. Upload image only to replace.';
      });

      projectList.appendChild(row);
    });
  }

  drawProjects();
  updateJsonPreview();

  const saveAbout = document.getElementById('saveAbout');
  const saveServices = document.getElementById('saveServices');
  const projectForm = document.getElementById('projectForm');

  if (saveAbout) {
    saveAbout.addEventListener('click', () => {
      data.about = aboutField.value.trim() || defaultData.about;
      saveData(data);
      document.getElementById('aboutStatus').textContent = 'Saved!';
      setTimeout(() => document.getElementById('aboutStatus').textContent = '', 1800);
      updateJsonPreview();
    });
  }

  if (saveServices) {
    saveServices.addEventListener('click', () => {
      const items = servicesField.value.split('\n').map(line => line.trim()).filter(Boolean);
      data.services = items.map(line => {
        const [title, desc] = line.split('|').map(p => p.trim());
        return { title: title || 'Service', description: desc || 'No details provided' };
      });
      saveData(data);
      document.getElementById('servicesStatus').textContent = 'Saved!';
      setTimeout(() => document.getElementById('servicesStatus').textContent = '', 1800);
      updateJsonPreview();
    });
  }

  if (projectForm) {
    projectForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('projectTitle').value.trim();
      const category = document.getElementById('projectCategory').value.trim();
      const description = document.getElementById('projectDescription').value.trim();
      const imageFile = document.getElementById('projectImage').files[0];
      const status = document.getElementById('projectStatus');

      if (!title || !category || !description) {
        status.textContent = 'Title, category and description are required.';
        return;
      }

      const finishSave = (imageUrl) => {
        if (editIndex === -1) {
          data.projects.unshift({ title, category, description, image: imageUrl });
          status.textContent = 'Project added.';
        } else {
          data.projects[editIndex] = { ...data.projects[editIndex], title, category, description, image: imageUrl || data.projects[editIndex].image };
          status.textContent = 'Project updated.';
        }
        saveData(data);
        projectForm.reset();
        drawProjects();
        updateJsonPreview();
        resetProjectInputs();
      };

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => finishSave(e.target.result);
        reader.readAsDataURL(imageFile);
      } else {
        finishSave(editIndex !== -1 ? data.projects[editIndex].image : 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80');
      }
    });
  }
}


function enableScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section, .card, .project-card, .contact-info, .admin-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

function init() {
  if (document.getElementById('projectsGrid')) {
    renderHomepage();
    enableScrollReveal();
  }
  if (document.getElementById('adminAbout')) {
    renderAdminPage();
  }
}

init();
