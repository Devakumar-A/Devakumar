// Monkeypatch WebGL2 to resolve the FLIP_Y/PREMULTIPLY_ALPHA warning for 3D textures
if (typeof window !== "undefined" && window.WebGL2RenderingContext) {
  const originalTexImage3D = window.WebGL2RenderingContext.prototype.texImage3D;
  window.WebGL2RenderingContext.prototype.texImage3D = function(...args) {
    const flipY = this.getParameter(this.UNPACK_FLIP_Y_WEBGL);
    const premultiply = this.getParameter(this.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
    let restoreFlip = false;
    let restorePremultiply = false;

    if (flipY) {
      this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL, false);
      restoreFlip = true;
    }
    if (premultiply) {
      this.pixelStorei(this.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      restorePremultiply = true;
    }

    const result = originalTexImage3D.apply(this, args);

    if (restoreFlip) this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL, true);
    if (restorePremultiply) this.pixelStorei(this.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    return result;
  };

  const originalTexSubImage3D = window.WebGL2RenderingContext.prototype.texSubImage3D;
  window.WebGL2RenderingContext.prototype.texSubImage3D = function(...args) {
    const flipY = this.getParameter(this.UNPACK_FLIP_Y_WEBGL);
    const premultiply = this.getParameter(this.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
    let restoreFlip = false;
    let restorePremultiply = false;

    if (flipY) {
      this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL, false);
      restoreFlip = true;
    }
    if (premultiply) {
      this.pixelStorei(this.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      restorePremultiply = true;
    }

    const result = originalTexSubImage3D.apply(this, args);

    if (restoreFlip) this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL, true);
    if (restorePremultiply) this.pixelStorei(this.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    return result;
  };
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
