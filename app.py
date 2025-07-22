import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
from ciphers import RailFenceCipher, RowTranspositionCipher

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-for-cryptography-tool")

@app.route('/')
def index():
    """Main page with cipher input forms."""
    return render_template('index.html')

@app.route('/encrypt', methods=['POST'])
def encrypt():
    """Process encryption request and return results."""
    try:
        # Get form data
        message = request.form.get('message', '').strip()
        rail_fence_key = request.form.get('rail_fence_key', '').strip()
        row_transposition_key = request.form.get('row_transposition_key', '').strip()
        
        # Validate inputs
        if not message:
            flash('Please enter a message to encrypt.', 'error')
            return redirect(url_for('index'))
        
        results = {}
        
        # Rail Fence Cipher
        if rail_fence_key:
            try:
                rails = int(rail_fence_key)
                if rails < 2:
                    flash('Rail Fence key must be at least 2.', 'error')
                elif rails > len(message):
                    flash('Rail Fence key cannot be greater than message length.', 'error')
                else:
                    rail_cipher = RailFenceCipher(rails)
                    results['rail_fence'] = {
                        'encrypted': rail_cipher.encrypt(message),
                        'key': rails
                    }
            except ValueError:
                flash('Rail Fence key must be a valid number.', 'error')
        
        # Row Transposition Cipher
        if row_transposition_key:
            if not row_transposition_key.isalpha():
                flash('Row Transposition key must contain only letters.', 'error')
            else:
                row_cipher = RowTranspositionCipher(row_transposition_key.upper())
                results['row_transposition'] = {
                    'encrypted': row_cipher.encrypt(message),
                    'key': row_transposition_key.upper()
                }
        
        if not results:
            flash('Please provide at least one valid key for encryption.', 'error')
            return redirect(url_for('index'))
        
        return render_template('index.html', 
                             message=message, 
                             results=results,
                             rail_fence_key=rail_fence_key,
                             row_transposition_key=row_transposition_key)
    
    except Exception as e:
        app.logger.error(f"Encryption error: {str(e)}")
        flash('An error occurred during encryption. Please try again.', 'error')
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
