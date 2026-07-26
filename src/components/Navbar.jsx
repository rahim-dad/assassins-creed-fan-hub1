import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, Drawer, Button, Input, Grid, Tooltip, AutoComplete } from 'antd';
import { MenuOutlined, SearchOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../store/slices/searchSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import spawnRipple from '../utils/spawnRipple';

const { useBreakpoint } = Grid;

const navItems = [
  { key: '/', label: 'Home' },
  { key: '/games', label: 'Games' },
  { key: '/characters', label: 'Characters' },
  { key: '/timeline', label: 'Timeline' },
  { key: '/history', label: 'Historical Settings' },
  { key: '/compare', label: 'Compare Games' },
  { key: '/favorites', label: 'Favorites' },
  { key: '/about', label: 'About' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const themeMode = useSelector((state) => state.theme.mode);
  const isLight = themeMode === 'light';
  const handleThemeToggle = () => dispatch(toggleTheme());
  const [scrolled, setScrolled] = useState(false);
  const [searchText, setSearchText] = useState('');
  const games = useSelector((s) => s.games.items);

  const suggestions = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return [];
    return games
      .filter((g) => g.title.toLowerCase().includes(q) || g.era.toLowerCase().includes(q))
      .slice(0, 6)
      .map((g) => ({ value: g.title, gameId: g.id }));
  }, [searchText, games]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (key) => {
    navigate(key);
    setDrawerOpen(false);
  };

  const handleSearch = (value) => {
    dispatch(setQuery(value));
    navigate('/games');
    setDrawerOpen(false);
  };

  const handleSuggestionSelect = (value, option) => {
    setSearchText('');
    if (option?.gameId) {
      navigate(`/games/${option.gameId}`);
    } else {
      handleSearch(value);
    }
  };

  return (
    <Layout.Header
      className={`ac-navbar ${scrolled ? 'ac-navbar--scrolled' : 'ac-navbar--top'}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--ac-nav-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--ac-line)',
        padding: isMobile ? '0 16px' : '0 32px',
        height: 68,
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--ac-gold)', fontFamily: 'var(--font-display)', fontSize: 20 }}>⟁</span>
        <span className="display-heading" style={{ fontSize: 18, letterSpacing: '0.06em' }}>
          ASSASSIN'S CREED <span style={{ color: 'var(--ac-red-bright)' }}>HUB</span>
        </span>
      </Link>

      {!isMobile && (
        <Menu
          mode="horizontal"
          className="ac-navbar-menu"
          selectedKeys={[location.pathname]}
          items={navItems.map((n) => ({ key: n.key, label: n.label }))}
          onClick={({ key }) => handleClick(key)}
          style={{ flex: 1, justifyContent: 'center', background: 'transparent', borderBottom: 'none', minWidth: 0 }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {!isMobile && (
          <AutoComplete
            options={suggestions}
            value={searchText}
            onChange={setSearchText}
            onSelect={handleSuggestionSelect}
            style={{ width: 250 }}
            popupMatchSelectWidth={280}
          >
            <Input.Search
              placeholder="Search games, characters, eras..."
              allowClear
              onSearch={handleSearch}
            />
          </AutoComplete>
        )}
        <Tooltip title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}>
          <Button
            type="text"
            shape="circle"
            onClick={handleThemeToggle}
            onMouseDown={spawnRipple}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            icon={
              isLight ? (
                <MoonOutlined style={{ color: 'var(--ac-gold)' }} />
              ) : (
                <SunOutlined style={{ color: 'var(--ac-gold)' }} />
              )
            }
            style={{
              border: '1px solid var(--ac-line)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
            }}
            className="theme-toggle-btn"
          />
        </Tooltip>
        {isMobile && (
          <Button
            type="text"
            icon={<SearchOutlined style={{ color: 'var(--ac-white)' }} />}
            onClick={() => setDrawerOpen(true)}
          />
        )}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: 'var(--ac-white)' }} />}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          />
        )}
      </div>

      <Drawer
        title="Navigate"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{ body: { padding: 0 }, header: { background: 'var(--ac-panel)' }, content: { background: 'var(--ac-panel)' } }}
      >
        <div style={{ padding: 16 }}>
          <Input.Search placeholder="Search..." allowClear onSearch={handleSearch} />
        </div>
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={navItems.map((n) => ({ key: n.key, label: n.label }))}
          onClick={({ key }) => handleClick(key)}
          style={{ background: 'transparent', border: 'none' }}
        />
      </Drawer>
    </Layout.Header>
  );
}
