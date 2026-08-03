import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyNames } from '../utils/data';

export default function HeroSearch() {
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [size, setSize] = useState('Any Size');
  const [status, setStatus] = useState('Any Status');
  
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time search effect
  useEffect(() => {
    const lowerKeyword = keyword.toLowerCase();
    const newResults = [];

    propertyNames.forEach(p => {
      const [title, location, sqft, stat, pType] = p;
      
      let match = true;
      if (keyword.trim() && !p.some(field => field && field.toLowerCase().includes(lowerKeyword))) match = false;
      if (status !== 'Any Status' && stat !== status) match = false;
      if (propertyType !== 'All Types' && pType !== propertyType) match = false;
      
      if (size !== 'Any Size') {
        const numSqft = parseInt(sqft.replace(/,/g, '').replace(' sqft', ''));
        if (size === '< 2,000 sqft' && numSqft >= 2000) match = false;
        if (size === '2,000 - 5,000 sqft' && (numSqft < 2000 || numSqft > 5000)) match = false;
        if (size === '5,000 - 10,000 sqft' && (numSqft < 5000 || numSqft > 10000)) match = false;
        if (size === '> 10,000 sqft' && numSqft <= 10000) match = false;
      }

      if (match) {
        newResults.push({
          type: pType || 'Property',
          title: title,
          desc: `${location} • ${sqft} • ${stat}`,
          link: title.toLowerCase().includes('mani') ? '/mani-casadona' : title.toLowerCase().includes('ecospace') ? '/ecospace' : '/properties'
        });
      }
    });

    // Interior Design logic
    const interiorKeywords = ['interior', 'design', 'fit', 'workspace', 'office', 'furniture', 'glass', 'turnkey'];
    if (propertyType === 'All Types' || propertyType === 'Interior Design') {
      const isInteriorMatch = !keyword.trim() || interiorKeywords.some(k => k.includes(lowerKeyword) || lowerKeyword.includes(k));
      // Size and Status don't apply to interior, so we only show it if they are set to Any
      if (isInteriorMatch && size === 'Any Size' && status === 'Any Status') {
         newResults.push({
            type: 'Interior Design',
            title: `Futuristic Workspaces & Fit-outs`,
            desc: 'Explore our turnkey interior design and workspace fit-out services.',
            link: '/interior'
         });
      }
    }

    setResults(newResults);
  }, [keyword, propertyType, size, status]);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return (
    <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--line)', position: 'relative', zIndex: 50 }}>
      <div 
        ref={searchRef}
        className="hero-search-strip"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="keyword-field" style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', textTransform: 'uppercase', color: '#93897a', marginBottom: '6px', letterSpacing: '0.08em' }}>Keyword / Location</label>
          <input 
            type="text" 
            placeholder="e.g. New Town, Ecospace..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={handleInputFocus}
            style={{ border: 'none', borderBottom: '1px solid var(--line)', padding: '8px 0', fontSize: '14px', color: 'var(--ink)', background: 'transparent', outline: 'none' }}
          />
        </div>

        <div className="hero-search-divider" style={{ width: '1px', height: '40px', background: 'var(--line)', margin: '0 8px' }}></div>

        <div className="advanced-filter" style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', textTransform: 'uppercase', color: '#93897a', marginBottom: '6px', letterSpacing: '0.08em' }}>Property Type</label>
          <select 
            value={propertyType}
            onChange={(e) => { setPropertyType(e.target.value); setIsFocused(true); }}
            onFocus={handleInputFocus}
            style={{ border: 'none', borderBottom: '1px solid var(--line)', padding: '8px 0', fontSize: '14px', color: 'var(--ink)', background: 'transparent', outline: 'none', cursor: 'pointer' }}
          >
            <option>All Types</option>
            <option>Office Space</option>
            <option>IT Park</option>
            <option>Coworking</option>
            <option>Retail</option>
            <option>Interior Design</option>
          </select>
        </div>

        <div className="hero-search-divider" style={{ width: '1px', height: '40px', background: 'var(--line)', margin: '0 8px' }}></div>

        <div className="advanced-filter" style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', textTransform: 'uppercase', color: '#93897a', marginBottom: '6px', letterSpacing: '0.08em' }}>Area (Sq.Ft)</label>
          <select 
            value={size}
            onChange={(e) => { setSize(e.target.value); setIsFocused(true); }}
            onFocus={handleInputFocus}
            style={{ border: 'none', borderBottom: '1px solid var(--line)', padding: '8px 0', fontSize: '14px', color: 'var(--ink)', background: 'transparent', outline: 'none', cursor: 'pointer' }}
          >
            <option>Any Size</option>
            <option>&lt; 2,000 sqft</option>
            <option>2,000 - 5,000 sqft</option>
            <option>5,000 - 10,000 sqft</option>
            <option>&gt; 10,000 sqft</option>
          </select>
        </div>

        <div className="hero-search-divider" style={{ width: '1px', height: '40px', background: 'var(--line)', margin: '0 8px' }}></div>

        <div className="advanced-filter" style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', textTransform: 'uppercase', color: '#93897a', marginBottom: '6px', letterSpacing: '0.08em' }}>Status</label>
          <select 
            value={status}
            onChange={(e) => { setStatus(e.target.value); setIsFocused(true); }}
            onFocus={handleInputFocus}
            style={{ border: 'none', borderBottom: '1px solid var(--line)', padding: '8px 0', fontSize: '14px', color: 'var(--ink)', background: 'transparent', outline: 'none', cursor: 'pointer' }}
          >
            <option>Any Status</option>
            <option>Lease</option>
            <option>Sale</option>
            <option>Coworking</option>
            <option>Investment</option>
          </select>
        </div>

        <button 
          className="hero-search-btn"
          onClick={() => setIsFocused(true)}
          style={{
            background: 'var(--brass)',
            color: '#fff',
            border: 'none',
            padding: '14px 32px',
            fontFamily: 'IBM Plex Mono',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            marginLeft: '16px',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#8a6523'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--brass)'}
        >
          Search
        </button>

        {/* Results Dropdown Container */}
        {isFocused && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--white)',
            borderBottom: '1px solid var(--line)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '24px 0'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                Search Results ({results.length})
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {results.length > 0 ? (
                  results.map((r, i) => (
                    <div 
                      key={i}
                      onClick={() => navigate(r.link)}
                      style={{
                        padding: '16px',
                        border: '1px solid var(--line)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        background: 'var(--paper)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--paper-2)'; e.currentTarget.style.borderColor = 'var(--brass)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--paper)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>{r.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{r.desc}</div>
                      <div style={{ 
                        alignSelf: 'flex-start',
                        fontFamily: 'IBM Plex Mono', 
                        fontSize: '9px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em', 
                        background: 'var(--ink)', 
                        color: 'var(--white)', 
                        padding: '4px 8px' 
                      }}>
                        {r.type}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', padding: '32px', textAlign: 'center', color: 'var(--ink-soft)', border: '1px dashed var(--line)' }}>
                    No properties match your exact filters. Try broadening your search criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
