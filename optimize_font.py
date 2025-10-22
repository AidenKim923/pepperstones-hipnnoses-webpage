"""
폰트 최적화 스크립트
- JSON 파일에서 사용되는 모든 문자 추출
- 서브셋 폰트 생성 (필요한 문자만 포함)
- WOFF2 포맷으로 변환
"""

import json
import os
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

def extract_chars_from_json(json_path):
    """JSON 파일에서 모든 문자 추출"""
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    def extract_text(obj):
        """재귀적으로 모든 텍스트 값 추출"""
        chars = set()
        if isinstance(obj, dict):
            for value in obj.values():
                chars.update(extract_text(value))
        elif isinstance(obj, list):
            for item in obj:
                chars.update(extract_text(item))
        elif isinstance(obj, str):
            chars.update(obj)
        return chars

    return extract_text(data)

def get_all_chars_from_locales():
    """모든 locale 파일에서 문자 추출"""
    locale_files = [
        'src/locales/ko.json',
        'src/locales/en.json',
        'src/locales/ja.json'
    ]

    all_chars = set()
    for locale_file in locale_files:
        if os.path.exists(locale_file):
            chars = extract_chars_from_json(locale_file)
            all_chars.update(chars)
            print(f"[OK] {locale_file}: {len(chars)} unique characters")

    # 기본적으로 필요한 문자 추가 (숫자, 기본 문장부호 등)
    basic_chars = set('0123456789.,!?()[]{}:;-—–•\'\"/@#$%&*+=<>~`|\\_ \n\t')
    all_chars.update(basic_chars)

    return all_chars

def create_font_subset(input_font, output_font, chars):
    """폰트 서브셋 생성"""
    text = ''.join(chars)

    options = subset.Options()
    options.flavor = 'woff2'
    options.with_zopfli = False
    options.desubroutinize = True
    options.hinting = False

    font = subset.load_font(input_font, options)

    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)

    subset.save_font(font, output_font, options)

    return True

def main():
    print("=" * 60)
    print("폰트 최적화 스크립트 시작")
    print("=" * 60)

    input_font = 'src/assets/fonts/YEONGJUSeonbi.ttf'
    output_font = 'src/assets/fonts/YEONGJUSeonbi.woff2'

    if not os.path.exists(input_font):
        print(f"[ERROR] 폰트 파일을 찾을 수 없습니다: {input_font}")
        return

    original_size = os.path.getsize(input_font)
    print(f"\n원본 폰트: {input_font}")
    print(f"원본 크기: {original_size / 1024 / 1024:.2f} MB")

    print(f"\n[*] Locale 파일에서 사용 문자 추출 중...")
    all_chars = get_all_chars_from_locales()
    print(f"\n총 사용 문자 수: {len(all_chars)}")

    print(f"\n[*] 폰트 서브셋 생성 중...")
    print(f"출력 파일: {output_font}")

    try:
        create_font_subset(input_font, output_font, all_chars)

        optimized_size = os.path.getsize(output_font)
        reduction = (1 - optimized_size / original_size) * 100

        print(f"\n[OK] 최적화 완료!")
        print(f"최적화된 크기: {optimized_size / 1024:.2f} KB")
        print(f"감소율: {reduction:.1f}%")
        print(f"절약된 용량: {(original_size - optimized_size) / 1024 / 1024:.2f} MB")

    except Exception as e:
        print(f"\n[ERROR] 에러 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
