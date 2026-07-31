from PIL import Image, ImageDraw

def floodfill_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Get the image dimensions
    w, h = img.size
    
    # Floodfill from all 4 corners using a threshold
    ImageDraw.floodfill(img, xy=(0, 0), value=(255, 255, 255, 0), thresh=20)
    ImageDraw.floodfill(img, xy=(w-1, 0), value=(255, 255, 255, 0), thresh=20)
    ImageDraw.floodfill(img, xy=(0, h-1), value=(255, 255, 255, 0), thresh=20)
    ImageDraw.floodfill(img, xy=(w-1, h-1), value=(255, 255, 255, 0), thresh=20)

    # Also make sure pure white everywhere becomes transparent just in case? No, floodfill is safer.
    # Actually, a threshold in floodfill might not be supported in older Pillow, but we have Pillow 10+
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

try:
    floodfill_transparent(
        r"C:\Users\Klubinika Bytes\.gemini\antigravity-ide\brain\37f404b4-67af-4436-b82e-2ad68f0784e0\media__1785482575470.png",
        r"C:\Users\Klubinika Bytes\Desktop\4walls\frontend\public\logo.png"
    )
except Exception as e:
    print("Error:", e)
