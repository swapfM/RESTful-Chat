from PIL import Image
from rest_framework.exceptions import ValidationError
import os


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 70 or img.heigt > 70:
                raise ValidationError(
                    f"The maximum allowed dimensions for the image are 70x70 - size of image you uploaded: {img.size}"
                )


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
