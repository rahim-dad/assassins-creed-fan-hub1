import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { GithubOutlined, LinkedinOutlined, GlobalOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <Layout.Footer
      style={{
        background: 'var(--ac-panel)',
        borderTop: '1px solid var(--ac-line)',
        padding: '48px 24px 24px',
      }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32 }}>
        <div style={{ maxWidth: 320 }}>
          <div className="display-heading" style={{ fontSize: 18, marginBottom: 10 }}>
            ASSASSIN'S CREED <span style={{ color: 'var(--ac-red-bright)' }}>HUB</span>
          </div>
          <p style={{ color: 'var(--ac-muted)', fontSize: 13, lineHeight: 1.7 }}>
            An unofficial fan-made reference hub cataloguing every released Assassin's Creed
            title, protagonist, era, and setting. Built as a frontend showcase project.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <SocialIcon href="https://github.com" label="GitHub"><GithubOutlined /></SocialIcon>
            <SocialIcon href="https://linkedin.com" label="LinkedIn"><LinkedinOutlined /></SocialIcon>
            <SocialIcon href="https://example.com" label="Portfolio"><GlobalOutlined /></SocialIcon>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Explore</div>
            <FooterLink to="/games">Games</FooterLink>
            <FooterLink to="/characters">Characters</FooterLink>
            <FooterLink to="/timeline">Timeline</FooterLink>
            <FooterLink to="/history">Historical Settings</FooterLink>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Tools</div>
            <FooterLink to="/compare">Compare Games</FooterLink>
            <FooterLink to="/favorites">Favorites</FooterLink>
            <FooterLink to="/about">About</FooterLink>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--ac-line)', color: 'var(--ac-muted)', fontSize: 12 }}>
        Fan project for portfolio purposes. Assassin's Creed is a trademark of Ubisoft Entertainment. Not affiliated with or endorsed by Ubisoft.
      </div>
    </Layout.Footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <Link to={to} style={{ color: 'var(--ac-muted)', fontSize: 13 }}
        onMouseOver={(e) => (e.target.style.color = 'var(--ac-gold)')}
        onMouseOut={(e) => (e.target.style.color = 'var(--ac-muted)')}
      >
        {children}
      </Link>
    </div>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="footer-social-icon"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: '50%',
        border: '1px solid var(--ac-line)',
        color: 'var(--ac-muted)',
        fontSize: 16,
      }}
    >
      {children}
    </a>
  );
}
