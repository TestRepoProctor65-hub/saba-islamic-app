import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("saba_tasbih_count");
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [prayerTimes, setPrayerTimes] = useState(null);
  const [verse, setVerse] = useState({ text: '', reference: '' });
  
  // A collection of beautiful Hadiths to display
  const hadiths = [
    "The best among you are those who have the best manners and character.",
    "The powerful man is not the one who can wrestle, but the one who can control himself in a fit of anger.",
    "A good word is a form of charity.",
    "He who is not merciful to others, will not be treated mercifully by Allah.",
    "Cleanliness is half of faith."
  ];
  
  const [dailyHadith] = useState(hadiths[Math.floor(Math.random() * hadiths.length)]);
  const city = 'Bangalore';

  useEffect(() => {
    localStorage.setItem("saba_tasbih_count", count);
  }, [count]);

  useEffect(() => {
    // 1. Fetch Bangalore Prayer Times
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=India&method=1`)
      .then(res => res.json())
      .then(data => setPrayerTimes(data.data.timings))
      .catch(err => console.error("Prayer Error:", err));

    // 2. Fetch Quran Verse
    const randomAyah = Math.floor(Math.random() * 6236) + 1;
    fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}/en.asad`)
      .then(res => res.json())
      .then(data => {
        setVerse({
          text: data.data.text,
          reference: `${data.data.surah.englishName} - Ayah ${data.data.numberInSurah}`
        });
      })
      .catch(err => console.error("Quran Error:", err));
  }, []);

  return (
    <div className="App" style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>
      <header style={{ padding: '60px 20px', backgroundColor: '#2c3e50', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: '0' }}>Saba's Islamic App</h1>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginTop: '10px' }}>
          Praising Allah for everything every moment of my life
        </p>
      </header>
      
      <main style={{ maxWidth: '500px', margin: '-40px auto 0', padding: '0 20px' }}>
        
        {/* Quran Verse Section */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px', borderLeft: '5px solid #27ae60' }}>
          <h3 style={{ marginTop: '0', color: '#27ae60', fontSize: '1rem', textTransform: 'uppercase' }}>Quranic Verse</h3>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>"{verse.text}"</p>
          <small>— {verse.reference}</small>
        </div>

        {/* Hadith Wisdom Section */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px', borderLeft: '5px solid #2980b9' }}>
          <h3 style={{ marginTop: '0', color: '#2980b9', fontSize: '1rem', textTransform: 'uppercase' }}>Hadith Wisdom</h3>
          <p style={{ fontSize: '1.1rem' }}>"{dailyHadith}"</p>
          <small>— Prophet Muhammad (PBUH)</small>
        </div>

        {/* Prayer Times Section */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h2 style={{ textAlign: 'center', color: '#2c3e50', fontSize: '1.4rem' }}>Bangalore Times</h2>
          {prayerTimes ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'center' }}>
              <div><strong>Fajr:</strong> {prayerTimes.Fajr}</div>
              <div><strong>Sunrise:</strong> {prayerTimes.Sunrise}</div>
              <div><strong>Dhuhr:</strong> {prayerTimes.Dhuhr}</div>
              <div><strong>Asr:</strong> {prayerTimes.Asr}</div>
              <div><strong>Maghrib:</strong> {prayerTimes.Maghrib}</div>
              <div><strong>Isha:</strong> {prayerTimes.Isha}</div>
            </div>
          ) : (
            <p style={{ textAlign: 'center' }}>Loading times...</p>
          )}
        </div>

        {/* Tasbih Section */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2 style={{ color: '#2c3e50' }}>Digital Tasbih</h2>
          <div style={{ fontSize: '5rem', fontWeight: 'bold', color: '#27ae60', margin: '10px 0' }}>{count}</div>
          <button onClick={() => setCount(count + 1)} style={{ padding: '15px 40px', fontSize: '1.2rem', borderRadius: '50px', border: 'none', backgroundColor: '#27ae60', color: 'white', cursor: 'pointer', marginRight: '10px' }}>Count</button>
          <button onClick={() => setCount(0)} style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '50px', border: 'none', backgroundColor: '#e74c3c', color: 'white', cursor: 'pointer' }}>Reset</button>
        </div>
      </main>
    </div>
  )
}

export default App
