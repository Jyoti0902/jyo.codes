import sharp from "sharp";

async function test() {
  const { data, info } = await sharp("public/momo/WhatsApp Image 2026-10-29 at 3.30.14 PM.jpeg")
    .extract({ left: 0, top: 0, width: 268, height: 360 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width, H = info.height, C = info.channels;
  // Create an RGBA buffer
  const out = Buffer.alloc(W * H * 4);

  // We can do a flood fill from (0,0) and the perimeter of the crop
  // What pixels belong to the outside background?
  // Let's trace from the edges inwards:
  // Along any ray from the edge towards the center (W/2, H/2):
  // As we move inwards, we hit background (253), then shadow (drops to ~230), then white sticker border (254), then character (<200).
  // If we flood-fill from (0,0) where brightness >= 248 OR in the shadow zone until we hit the white sticker border:
  
  // Let's see: Can we find the white border boundary?
  // Let's inspect along rays from center outwards!
  const cx = 135, cy = 180;
  console.log("Center:", cx, cy);

  // Let's check flood fill:
  // A standard way to remove white/gray background around a sticker:
  // 1. Flood fill from image borders with a threshold.
  // Let's see what happens if we flood-fill from (0,0) with threshold:
  // If pixel is background (r > 225 && g > 225 && b > 225 && saturation < 0.15)
  // Wait! The white sticker border ALSO has r > 225 && g > 225 && b > 225 && saturation < 0.15!
  // BUT the shadow separates the white border from the background!
  // Wait, does the shadow encircle the ENTIRE sticker?
  // YES! The drop shadow is cast all the way around the sticker!
}

test();

