import { useState, useRef, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { saveAs } from 'file-saver'
import './App.css'

function App() {
  const [text, setText] = useState('https://example.com')
  const [qrSize, setQrSize] = useState(256)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [fgColor, setFgColor] = useState('#000000')
  const [inputType, setInputType] = useState('url')
  const [showCopyMessage, setShowCopyMessage] = useState(false)
  const [showDownloadMessage, setShowDownloadMessage] = useState(false)
  const qrRef = useRef()
  const mainContainerRef = useRef()

  // Animation effect on component mount
  useEffect(() => {
    const container = mainContainerRef.current
    if (container) {
      container.classList.add('fade-in-up')
    }
  }, [])

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas')
    canvas.toBlob((blob) => {
      saveAs(blob, 'qrcode.png')
      setShowDownloadMessage(true)
      setTimeout(() => setShowDownloadMessage(false), 2000)
    })
  }

  const handleCopyToClipboard = () => {
    const canvas = qrRef.current.querySelector('canvas')
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ])
        setShowCopyMessage(true)
        setTimeout(() => setShowCopyMessage(false), 2000)
      } catch (err) {
        alert('Failed to copy QR code: ' + err)
      }
    })
  }

  const inputPlaceholders = {
    url: 'Enter website URL (e.g., https://example.com)',
    text: 'Enter plain text',
    email: 'Enter email address',
    contact: 'Enter contact info (Name, Phone, Email, etc.)'
  }

  return (
    <div className="app-container" ref={mainContainerRef}>
      {/* Animated background elements */}
      <div className="background-animation">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
        <div className="circle-4"></div>
        <div className="circle-5"></div>
      </div>

      <div className="content-wrapper">
        <div className="card">
          <div className="card-header">
            <div className="title-container">
              <h1 className="title">QR Code Generator</h1>
              <p className="subtitle">Generate QR codes for websites, text, email or contact information</p>
            </div>

            <div className="tab-container">
              {Object.keys(inputPlaceholders).map((type) => (
                <button
                  key={type}
                  onClick={() => setInputType(type)}
                  className={`tab ${inputType === type ? 'active' : ''}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <div className="input-container">
              <input
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder={inputPlaceholders[inputType]}
                className="text-input"
              />
            </div>
          </div>

          <div className="card-body">
            <div className="options-panel">
              <h2 className="section-title">Customization</h2>
              
              <div className="option-group">
                <label htmlFor="qr-size" className="option-label">Size</label>
                <div className="slider-container">
                  <input
                    type="range"
                    id="qr-size"
                    min="128"
                    max="512"
                    step="32"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="slider"
                  />
                  <span className="slider-value">{qrSize} x {qrSize}px</span>
                </div>
              </div>

              <div className="option-group">
                <label htmlFor="fg-color" className="option-label">Foreground Color</label>
                <div className="color-input-container">
                  <input
                    type="color"
                    id="fg-color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="color-input"
                  />
                  <span className="color-value">{fgColor}</span>
                </div>
              </div>

              <div className="option-group">
                <label htmlFor="bg-color" className="option-label">Background Color</label>
                <div className="color-input-container">
                  <input
                    type="color"
                    id="bg-color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="color-input"
                  />
                  <span className="color-value">{bgColor}</span>
                </div>
              </div>
            </div>
            
            <div className="qr-panel">
              <div 
                ref={qrRef}
                className="qr-preview"
                style={{ backgroundColor: bgColor }}
              >
                <QRCodeCanvas
                  value={text || 'https://example.com'}
                  size={qrSize}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={true}
                  className="qr-code"
                />
              </div>
              
              <div className="action-buttons">
                <button
                  onClick={handleDownload}
                  className="btn download-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download PNG
                </button>
                {showDownloadMessage && <span className="message-popup download">Downloaded!</span>}
                
                <button
                  onClick={handleCopyToClipboard}
                  className="btn copy-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy to Clipboard
                </button>
                {showCopyMessage && <span className="message-popup copy">Copied!</span>}
              </div>
            </div>
          </div>

          <div className="card-footer">
            <p className="copyright">QR Code Generator &copy; 2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
