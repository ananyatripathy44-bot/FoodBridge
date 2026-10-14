(() => {
  const modal = document.getElementById('rescue-modal');
  if (!modal) return;
  const data = {
    disaster: {
      title: 'Disaster emergency food',
      kicker: '🌊 DISASTER RESPONSE · DEMO PLAYBOOK',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=85',
      alt: 'Relief volunteers distributing supplies',
      description: 'A coordination pathway for community kitchens and relief groups responding to floods, storms, displacement or other disruptions. This is guidance for the demo interface, not a live incident report.',
      list: ['Confirm the affected location and the requesting organization.', 'Estimate people to be served and the next meal deadline.', 'Coordinate ready-to-eat meals, drinking water and dry-ration kits.', 'Assign a delivery partner and record handover status.', 'Have an authorized coordinator verify the request before marking it confirmed.']
    },
    hospital: {
      title: 'Hospital emergency food',
      kicker: '🏥 HOSPITAL SUPPORT · DEMO PLAYBOOK',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85',
      alt: 'Healthcare team in a hospital setting',
      description: 'A separate pathway for food requirements connected to hospitals or care centres. Requests should come from an authorized representative and must respect facility rules and any dietary restrictions.',
      list: ['Confirm the hospital or care centre and authorized contact.', 'Clarify whether meals are for attendants, staff or another eligible group.', 'Check meal timing, quantity, packaging and dietary requirements.', 'Coordinate delivery access with the facility contact.', 'Do not treat a request as verified until an administrator has reviewed it.']
    },
    community: {
      title: 'Urgent community meals',
      kicker: '🤝 COMMUNITY CARE · DEMO PLAYBOOK',
      image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1200&q=85',
      alt: 'Community food packages ready for distribution',
      description: 'A local coordination pathway for NGOs, community kitchens and volunteers when a neighbourhood has an urgent meal requirement.',
      list: ['Confirm the organization, location and number of people.', 'Match available donations to the food preference and quantity.', 'Check preparation time and safe delivery window.', 'Assign a driver or volunteer and share clear handover instructions.', 'Update the request status so the community can follow progress.']
    }
  };
  function openDetails(key) {
    const item = data[key];
    if (!item) return;
    document.getElementById('rescue-modal-title').textContent = item.title;
    document.getElementById('rescue-modal-kicker').textContent = item.kicker;
    document.getElementById('rescue-modal-desc').textContent = item.description;
    const img = document.getElementById('rescue-modal-img');
    img.src = item.image; img.alt = item.alt;
    const list = document.getElementById('rescue-modal-list');
    list.replaceChildren(...item.list.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.rescue-modal-close').focus();
  }
  function closeDetails() {
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-rescue]').forEach(button => button.addEventListener('click', () => openDetails(button.dataset.rescue)));
  modal.querySelectorAll('[data-close-rescue]').forEach(el => el.addEventListener('click', closeDetails));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeDetails(); });
  modal.querySelector('#rescue-modal-action').addEventListener('click', closeDetails);
  // Reveal emergency cards as they enter view, with a safe fallback for older browsers.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('rescue-visible'); observer.unobserve(entry.target); }
    }), {threshold: .12});
    document.querySelectorAll('.rescue-card').forEach(card => observer.observe(card));
  }
})();
