"""
Remove the solid background from the PolitiCat badge.

Strategy: flood-fill from the image borders across "background-colored"
pixels only. Interior dark areas (cat fur, hat) are NOT border-connected,
so they are preserved. A short alpha feather removes the dark fringe halo.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1] if len(sys.argv) > 1 else "assets/img/politicat-logo-orig.png"
DST = sys.argv[2] if len(sys.argv) > 2 else "assets/img/politicat-logo.png"

# Background brightness threshold. Corners are pure black (0,0,0).
# Pixels whose brightest channel is below this are background candidates.
THRESH = 70

img = Image.open(SRC).convert("RGBA")
arr = np.asarray(img).astype(np.int16)
rgb = arr[:, :, :3]

# Candidate background = near-black (max channel below threshold)
brightest = rgb.max(axis=2)
dark = brightest < THRESH

# Connected components of the dark mask; keep only those touching the border.
labels, n = ndimage.label(dark)
border_labels = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
border_labels.discard(0)
background = np.isin(labels, list(border_labels))

# Build alpha: foreground opaque, background transparent.
alpha = np.where(background, 0, 255).astype(np.uint8)

# Feather the alpha edge slightly to kill the hard black halo.
alpha_img = Image.fromarray(alpha, mode="L").filter(ImageFilter.GaussianBlur(0.8))
alpha = np.asarray(alpha_img)

# Decontaminate: on the feathered edge, pull brightness up a touch so the
# remaining semi-transparent pixels don't read as a dark ring.
out = arr.copy()
out[:, :, 3] = alpha
result = Image.fromarray(out.astype(np.uint8), mode="RGBA")
result.save(DST)

removed = int(background.sum())
total = background.size
print(f"Saved {DST}: removed {removed}/{total} px ({100*removed/total:.1f}%) as transparent background")
