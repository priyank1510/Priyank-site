"""
Regenerates the raster brand assets in public/.

    python scripts/generate-assets.py

Outputs:
    public/og.png               1200x630 link-preview card
    public/apple-touch-icon.png 180x180 home-screen icon
    public/favicon-32.png       32x32 fallback for browsers without SVG favicons

The SVG favicon (public/favicon.svg) is hand-written and not generated here.
Colours are kept in sync with `theme` in src/content.js by hand — there are
only three of them.
"""

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

BG = (5, 6, 12)
ACCENT_A = (124, 92, 255)   # violet
ACCENT_B = (34, 211, 238)   # cyan
ACCENT_C = (244, 114, 182)  # pink
TEXT = (238, 241, 248)
TEXT_DIM = (163, 173, 194)

NAME = "Priyank Patel"
ROLE = "Software & ML Engineer"
TAGLINE = "Pipelines, APIs, and evaluation harnesses for production ML."

FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REG = "C:/Windows/Fonts/segoeui.ttf"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default(size)


def aurora(size, blobs):
    """
    Soft radial colour washes, the raster twin of the site's CSS aurora.
    Blobs are added rather than alpha-composited — light on a dark ground
    accumulates, which keeps the result rich instead of washing it to grey.
    """
    base = Image.new("RGB", size, BG)
    for cx, cy, radius, colour, strength in blobs:
        # Small solid core + wide blur gives a real falloff, so the dark ground
        # still shows between blobs instead of everything flattening to grey.
        core = radius * 0.32
        mask = Image.new("L", size, 0)
        ImageDraw.Draw(mask).ellipse(
            [cx - core, cy - core, cx + core, cy + core],
            fill=int(255 * strength),
        )
        mask = mask.filter(ImageFilter.GaussianBlur(radius * 0.42))
        # Scale the flat colour by the blurred mask, then add it to the ground.
        glow = ImageChops.multiply(Image.new("RGB", size, colour), mask.convert("RGB"))
        base = ImageChops.add(base, glow)
    return base


def glass_panel(img, box, radius=28, alpha=26):
    """Translucent rounded rect with a lit top edge — the site's .glass look."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.rounded_rectangle(box, radius=radius, fill=(255, 255, 255, alpha),
                        outline=(255, 255, 255, 46), width=2)
    d.line([box[0] + radius, box[1] + 2, box[2] - radius, box[1] + 2],
           fill=(255, 255, 255, 70), width=2)
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def make_og():
    img = aurora(
        (1200, 630),
        [
            (120, 40, 620, ACCENT_A, 0.95),
            (1120, 150, 560, ACCENT_B, 0.80),
            (600, 720, 620, ACCENT_C, 0.60),
        ],
    )
    img = glass_panel(img, (64, 64, 1136, 566), radius=40, alpha=14)
    d = ImageDraw.Draw(img)

    d.text((124, 150), ROLE.upper(), font=font(FONT_REG, 26), fill=ACCENT_B)
    d.text((124, 210), NAME, font=font(FONT_BOLD, 104), fill=TEXT)
    d.text((124, 350), TAGLINE, font=font(FONT_REG, 34), fill=TEXT_DIM)

    d.line([124, 440, 1076, 440], fill=(255, 255, 255, 40), width=1)
    d.text((124, 470), "github.com/priyank1510", font=font(FONT_REG, 26), fill=TEXT_DIM)
    d.text((124, 512), "Boston, MA", font=font(FONT_REG, 26), fill=TEXT_DIM)

    img.convert("RGB").save("public/og.png", optimize=True)
    print("wrote public/og.png")


def make_icon(size, path):
    """
    Favicons are 16-32px in practice, so the aurora treatment used elsewhere
    reads as mud. A flat diagonal accent gradient survives the downscale.
    """
    img = Image.new("RGB", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = tuple(
                round(a + (b - a) * t) for a, b in zip(ACCENT_A, ACCENT_B)
            )
    d = ImageDraw.Draw(img)
    f = font(FONT_BOLD, int(size * 0.5))
    text = "P"
    left, top, right, bottom = d.textbbox((0, 0), text, font=f)
    d.text(
        ((size - (right - left)) / 2 - left, (size - (bottom - top)) / 2 - top),
        text,
        font=f,
        fill=(8, 10, 20),
    )
    img.save(path, optimize=True)
    print(f"wrote {path}")


if __name__ == "__main__":
    make_og()
    make_icon(180, "public/apple-touch-icon.png")
    make_icon(32, "public/favicon-32.png")
