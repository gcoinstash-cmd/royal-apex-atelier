-- ==============================================================================
-- ROYAL APEX — Production Seed Data
-- ==============================================================================

-- Seed Specialists
INSERT INTO public.specialists (id, name, title, specialties, bio)
VALUES
(
  'marcus',
  'Marcus Sterling',
  'Master Barber & Founder',
  ARRAY['Precision Skin Fades', 'Hot Towel Shave', 'Beard Architecture'],
  'Over 15 years mastering straight-razor geometry and handcrafted shear sculpting in Mayfair and Beverly Hills.'
),
(
  'kiara',
  'Kiara J.',
  'Creative Braid Artisan',
  ARRAY['Protective Box Braids', 'Feed-in Cornrows', 'Geometric Parting'],
  'Pioneering symmetrical scalp scaling and nourishing organic botanical treatments.'
),
(
  'andre',
  'Andre Vance',
  'Loc Architect & Scalp Specialist',
  ARRAY['Loc Retwist', 'Deep Detox Soaks', 'Scalp Rehydration'],
  'Holistic loc restoration emphasizing natural fiber tension and organic botanical scalp oils.'
),
(
  'elena',
  'Elena Ramos',
  'Senior Shear Stylist',
  ARRAY['Precision Shear Cuts', 'Silk Press', 'Custom Color'],
  'Trained in Milan, specializing in modular shear techniques and high-definition texture.'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Services
INSERT INTO public.services (id, name, category, duration, price, description)
VALUES
('srv-001', 'Signature Skin Fade & Razor Edge-up', 'barbering', '45 mins', 55.00, 'Handcrafted shear fade finished with straight-razor nape rasp and organic aftershave balm.'),
('srv-002', 'Classic Haircut & Hot Towel Shave', 'barbering', '45 mins', 65.00, 'Full tailored haircut, eucalyptus warm steam towel wrap, and straight razor lather.'),
('srv-003', 'The Royal Apex Experience (Cut, Beard, Scalp Facial)', 'barbering', '75 mins', 110.00, 'Our pinnacle master appointment: bespoke cut, beard conditioning, and tea tree scalp detox.'),
('srv-004', 'Standard Box Braids (Medium)', 'braids', '120 mins', 140.00, 'Clean geometric part scaling with natural plant butter sealing and edge hold.'),
('srv-005', 'Premium Hair Loc Retwist & Grooming', 'locTech', '90 mins', 120.00, 'Meticulous palm-roll retwist, dry heat set, and organic peppermint hydration mist.'),
('srv-006', 'Signature Blowout & Silk Press', 'hairStylists', '75 mins', 95.00, 'Deep conditioning moisture wrap followed by mirror-shine ceramic silk pressing.')
ON CONFLICT (id) DO NOTHING;

-- Seed Appointments
INSERT INTO public.appointments (id, client_name, client_email, client_phone, service_name, category, specialist_name, date, time, price, status, notes)
VALUES
(
  'appt-001',
  'Dominic West',
  'd.west@privateequity.com',
  '+1 (310) 902-1845',
  'The Royal Apex Experience (Cut, Beard, Scalp Facial)',
  'barbering',
  'Marcus Sterling',
  CURRENT_DATE,
  '11:00 AM',
  110.00,
  'confirmed',
  'VIP client since 2018. Prefers single-malt scotch during service.'
),
(
  'appt-002',
  'Julian Vance',
  'jvance@investments.co',
  '+1 (415) 332-9011',
  'Signature Skin Fade & Razor Edge-up',
  'barbering',
  'Marcus Sterling',
  CURRENT_DATE + INTERVAL '1 day',
  '2:30 PM',
  55.00,
  'confirmed',
  'Zero guard low drop fade.'
),
(
  'appt-003',
  'Christian Bale',
  'cbale@filmcraft.io',
  '+1 (212) 884-2190',
  'Classic Haircut & Hot Towel Shave',
  'barbering',
  'Elena Ramos',
  CURRENT_DATE + INTERVAL '2 days',
  '4:00 PM',
  65.00,
  'pending',
  'Pre-event grooming session.'
)
ON CONFLICT (id) DO NOTHING;
