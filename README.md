# ENT Specialist Doctor & Clinic Website Template

A premium, production-ready, fully responsive ENT (Ear, Nose & Throat) specialist doctor portfolio and clinic website template. Built with semantic HTML5, modern CSS3 (custom properties), and vanilla JavaScript. 

**Zero frameworks required.** No React, Vue, Bootstrap, Tailwind, or jQuery runtime dependencies needed. Deploys directly to shared hosting (cPanel/Apache/Nginx), Vercel, Netlify, or GitHub Pages.

---

## 1. Project Architecture

```
ENT-Doctor-Website/
│
├── index.html                           # Flagship Homepage (Hero, About, Services, Chambers, FAQ, etc.)
├── about.html                           # Comprehensive Doctor Biography, Credentials & Philosophy
├── services.html                        # Complete 7-Specialty ENT Services Catalogue
├── conditions.html                      # Categorized Conditions & Symptoms Guide (Ear, Nose, Throat)
├── appointment.html                     # Interactive Appointment Booking Request Form
├── chambers.html                        # Multiple Chambers / Clinics with Full Visiting Hours & Maps
├── blog.html                            # Educational ENT Health Blog Index
├── contact.html                         # Direct Contact Channels (Phone, WhatsApp, Email, Inquiries)
│
├── css/
│   └── style.css                        # Pure Vanilla CSS3 with Theme Custom Properties & Responsive Breakpoints
│
├── js/
│   └── script.js                        # Vanilla JS Engine (Sticky Header, Mobile Menu, Tabs, Sliders, Form, XML Engine)
│
├── data/
│   └── doctor.xml                       # MASTER SOURCE OF TRUTH (All Doctor Data, Services, Chambers & Palette)
│
├── images/
│   ├── logo.svg                         # Clinic Brand Emblem
│   ├── doctor.svg                       # Doctor Medical Portrait Vector
│   ├── hero.svg                         # Hero Banner Clinic Architecture
│   ├── signature.svg                    # Official Signature
│   ├── favicon.svg                      # Web Favicon
│   ├── og-image.svg                     # Social Share / OpenGraph Card
│   ├── service-ear.svg                  # Ear Infection Illustration
│   ├── service-hearing.svg              # Audiology & Hearing Illustration
│   ├── service-sinus.svg                # Sinus & Allergy Illustration
│   ├── service-throat.svg               # Throat & Tonsil Illustration
│   ├── service-voice.svg                # Voice Acoustics Illustration
│   ├── service-sleep.svg                # Snoring & Sleep Apnea Illustration
│   ├── service-balance.svg              # Inner Ear Balance Illustration
│   ├── clinic-1.svg                     # Chamber 1 Facility Illustration
│   ├── clinic-2.svg                     # Chamber 2 Specialty Pavilion
│   ├── avatar-1.svg                     # Patient Testimonial Avatar 1
│   ├── avatar-2.svg                     # Patient Testimonial Avatar 2
│   ├── blog-1.svg                       # Blog Post 1 Featured Illustration
│   └── blog-2.svg                       # Blog Post 2 Featured Illustration
│
├── blog/
│   ├── protect-your-hearing-tips.html   # Post 1: Hearing Protection Guide
│   └── understanding-chronic-sinusitis.html # Post 2: Chronic Sinusitis Guide
│
├── robots.txt                           # Search Engine Crawler Directives
├── sitemap.xml                          # Canonical XML Sitemap
└── README.md                            # Comprehensive Setup & Deployment Documentation
```

---

## 2. Master Source of Truth: `data/doctor.xml`

All content is structured within `data/doctor.xml`. You can customize every aspect of the website by editing this single file:

1. **Global Settings**: Clinic branding, main telephone, WhatsApp link, email, social profiles.
2. **Theme Settings**: Primary medical blue, secondary teal, background colors, typography, border radius.
3. **Doctor Profile**: Full name, titles, degrees, registration number, medical biography, awards, memberships, languages.
4. **Services**: Titles, descriptions, keywords, image paths, enabled toggles.
5. **Conditions**: Categorized under Ear, Nose, Throat with symptom overviews and clinical treatment pathways.
6. **Chambers**: Multiple clinic branches, addresses, room numbers, parking info, and weekly visiting schedules.
7. **SEO Config**: Default titles, descriptions, OpenGraph tags, schema data.

---

## 3. How to Customize Doctor Information

Search and replace the bracketed placeholders across the HTML files and in `data/doctor.xml`:

| Placeholder | Description | Example |
| :--- | :--- | :--- |
| `[DOCTOR_NAME]` | Doctor's full name | `Dr. Alexander Hayes` |
| `[DEGREES]` | Medical degrees & fellowships | `MBBS, MS (ENT), FACS` |
| `[PROFESSIONAL_TITLE]` | Academic or clinical title | `Consultant Otolaryngologist` |
| `[REGISTRATION_NUMBER]` | Medical council registration | `MD-782914` |
| `[YEARS_OF_EXPERIENCE]` | Total clinical experience | `15` |
| `[PHONE]` | Primary office telephone | `+1 (555) 234-5678` |
| `[WHATSAPP]` | WhatsApp number (with country code) | `15552345678` |
| `[EMAIL]` | Official clinic email | `appointments@hayesent.com` |
| `[CHAMBER_NAME_1]` | Name of First Chamber | `City ENT Care Center` |
| `[HOSPITAL_NAME_1]` | Affiliated Hospital 1 | `St. Jude Memorial Hospital` |
| `[CHAMBER_ADDRESS_1]` | Full Address 1 | `450 Medical Arts Pavilion, Suite 300` |
| `[CITY_1]` | City / District 1 | `New York, NY 10016` |
| `[WEBSITE_URL]` | Live Domain Name | `https://www.hayesent.com` |

---

## 4. How to Change Colors & Visual Theme

The website uses CSS Custom Properties in `css/style.css`. You can modify the palette globally at the top of `css/style.css` or in `data/doctor.xml`:

```css
:root {
  --primary: #005A9C;          /* Primary Brand Medical Blue */
  --secondary: #008080;        /* Accent Medical Teal */
  --accent: #2ECC71;           /* Soft Medical Green */
  --background-main: #FFFFFF;  /* Neutral Canvas */
  --background-alt: #F8FAFC;   /* Soft Ice Slate */
  --text-dark: #002147;        /* Deep Navy for Headings */
  --text-muted: #4A5568;       /* High-contrast body text */
}
```

When served on a web server, `js/script.js` automatically reads `<themeSettings>` in `data/doctor.xml` and applies these CSS properties dynamically to the document root.

---

## 5. How to Add Services

To add a new service:
1. Open `data/doctor.xml` and add a new `<service>` element within `<servicesSection>`:
   ```xml
   <service id="pediatric-ent">
       <title>Pediatric ENT Care</title>
       <shortDescription>Gentle, specialized diagnosis and care for infant and pediatric ear, nose, and airway disorders.</shortDescription>
       <icon>child-icon</icon>
       <image>images/service-child.svg</image>
       <keywords>pediatric ent, ear tubes, adenoids</keywords>
       <enabled>true</enabled>
   </service>
   ```
2. In `services.html` (and `index.html`), copy an existing `<article class="service-card">` block and update the title, description, and keywords.

---

## 6. How to Add Chambers

To add a third chamber:
1. In `data/doctor.xml`, add a new `<chamber id="chamber-3">` element with name, hospital, address, phone, and weekly schedule entries.
2. In `chambers.html`, copy an existing chamber card block:
   ```html
   <article class="chamber-card" id="chamber-3">
     <div class="chamber-body">
       <h2 class="chamber-name">[CHAMBER_NAME_3]</h2>
       ...
     </div>
   </article>
   ```
3. In `appointment.html`, add `<option value="[CHAMBER_NAME_3]">[CHAMBER_NAME_3]</option>` to the `#preferred_chamber` dropdown.

---

## 7. How to Add Blog Posts

1. Duplicate `blog/protect-your-hearing-tips.html` and save it with your new slug (e.g., `blog/managing-pediatric-ear-infections.html`).
2. Update the `<title>`, `<meta name="description">`, `<h1>`, and article body text.
3. Add a new article card in `blog.html` linking to your new article page.
4. Add the URL to `sitemap.xml`.

---

## 8. Appointment Form Backend Configuration

The appointment booking form in `appointment.html` and `index.html` supports any backend processor:

### Option A: Free Formspree Integration
1. Sign up at [Formspree.io](https://formspree.io).
2. Create a form and copy your endpoint URL (e.g., `https://formspree.io/f/mqkvnxyz`).
3. Set the form action:
   ```html
   <form id="appointmentForm" action="https://formspree.io/f/mqkvnxyz" method="POST">
   ```
   Or set `<formActionUrl>https://formspree.io/f/mqkvnxyz</formActionUrl>` in `data/doctor.xml`.

### Option B: PHP Mailer Script (Shared Hosting / cPanel)
Create a file named `send-appointment.php` in the root:
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["patient_name"]));
    $phone = strip_tags(trim($_POST["patient_phone"]));
    $email = filter_var(trim($_POST["patient_email"]), FILTER_SANITIZE_EMAIL);
    $reason = strip_tags(trim($_POST["visit_reason"]));
    $date = strip_tags(trim($_POST["preferred_date"]));
    $chamber = strip_tags(trim($_POST["preferred_chamber"]));

    $to = "doctor@example.com";
    $subject = "New ENT Appointment Request from $name";
    $body = "Name: $name\nPhone: $phone\nEmail: $email\nReason: $reason\nDate: $date\nChamber: $chamber\n";
    $headers = "From: appointments@yourdomain.com\r\nReply-To: $email";

    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error"]);
    }
}
?>
```
Then set `action="send-appointment.php"`.

---

## 9. Deployment Guides

### A. Deploy to cPanel / Shared Hosting (Apache / Nginx)
1. Log in to your cPanel dashboard.
2. Open **File Manager** and navigate to `public_html/`.
3. Upload the ZIP file `ENT-Doctor-Website.zip` or upload the contents of the `ENT-Doctor-Website/` folder.
4. Extract all files directly into `public_html/`.
5. Ensure file permissions: `644` for `.html`, `.css`, `.js`, `.xml`, `.svg` files; `755` for directories.
6. Visit your domain in any browser.

### B. Connecting a Custom Domain in cPanel
1. In cPanel, navigate to **Domains** &rarr; **Addon Domains** or **Domains**.
2. Point your custom domain's root folder to `/public_html` (or subfolder).
3. In your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare), update your DNS `A Record` to your hosting server's IP address.
4. In cPanel **SSL/TLS Status**, enable **AutoSSL / Let's Encrypt** for free HTTPS.

### C. Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel` or link your GitHub repository on [Vercel.com](https://vercel.com).
2. Set Framework Preset: **Other** / **Static Site**.
3. Deploy:
   ```bash
   vercel --prod
   ```

### D. Deploy to Netlify
1. Log in to [Netlify.com](https://netlify.com).
2. Drag and drop the `ENT-Doctor-Website/` directory into the Netlify Sites dashboard.
3. Instant deployment with automated HTTPS and CDN distribution.

---

## 10. Search Engine Optimization & Google Search Console

1. Update `[WEBSITE_URL]` in `index.html`, `sitemap.xml`, and `robots.txt` with your live production URL.
2. Verify ownership in [Google Search Console](https://search.google.com/search-console).
3. Submit your sitemap: `https://www.yourdomain.com/sitemap.xml`.
4. The template includes pre-configured **Physician Schema.org JSON-LD** and **FAQPage Schema.org markup** for rich search results.

---

## 11. Medical Disclaimer Notice

This template adheres to international medical ethics guidelines:
- All sample reviews and case summaries are designated as sample educational content.
- Preserves explicit placeholders without fabricating fake medical licenses, patient testimonials, or unsupported clinical cure rates.
- Prominent medical disclaimers are placed on every page.
