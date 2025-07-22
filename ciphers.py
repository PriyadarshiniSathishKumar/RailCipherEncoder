"""
Cryptography cipher implementations for Rail Fence and Row Transposition ciphers.
"""

class RailFenceCipher:
    """Implementation of the Rail Fence Cipher encryption algorithm."""
    
    def __init__(self, rails):
        """
        Initialize the Rail Fence Cipher with specified number of rails.
        
        Args:
            rails (int): Number of rails for the fence
        """
        self.rails = rails
    
    def encrypt(self, message):
        """
        Encrypt a message using the Rail Fence Cipher.
        
        Args:
            message (str): The plaintext message to encrypt
            
        Returns:
            str: The encrypted message
        """
        if self.rails == 1:
            return message
        
        # Remove spaces and convert to uppercase for consistency
        message = message.replace(' ', '').upper()
        
        # Create the rail fence structure
        fence = [[] for _ in range(self.rails)]
        rail = 0
        direction = 1  # 1 for down, -1 for up
        
        # Place characters on the fence
        for char in message:
            fence[rail].append(char)
            rail += direction
            
            # Change direction at the top and bottom rails
            if rail == self.rails - 1 or rail == 0:
                direction = -direction
        
        # Read the fence row by row to get encrypted message
        encrypted = ''
        for row in fence:
            encrypted += ''.join(row)
        
        return encrypted


class RowTranspositionCipher:
    """Implementation of the Row Transposition Cipher encryption algorithm."""
    
    def __init__(self, key):
        """
        Initialize the Row Transposition Cipher with a keyword.
        
        Args:
            key (str): The keyword for column ordering
        """
        self.key = key.upper()
        self.key_order = self._get_key_order()
    
    def _get_key_order(self):
        """
        Generate the column order based on alphabetical sorting of the key.
        
        Returns:
            list: Order of columns for transposition
        """
        # Create pairs of (character, original_index)
        indexed_chars = [(char, i) for i, char in enumerate(self.key)]
        
        # Sort by character, then by original index for duplicates
        sorted_chars = sorted(indexed_chars, key=lambda x: (x[0], x[1]))
        
        # Return the order of original indices
        return [original_index for _, original_index in sorted_chars]
    
    def encrypt(self, message):
        """
        Encrypt a message using the Row Transposition Cipher.
        
        Args:
            message (str): The plaintext message to encrypt
            
        Returns:
            str: The encrypted message
        """
        # Remove spaces and convert to uppercase
        message = message.replace(' ', '').upper()
        
        key_length = len(self.key)
        
        # Pad message if necessary to fill complete rows
        while len(message) % key_length != 0:
            message += 'X'  # Padding character
        
        # Create the grid
        rows = len(message) // key_length
        grid = []
        
        # Fill the grid row by row
        for i in range(rows):
            row = []
            for j in range(key_length):
                row.append(message[i * key_length + j])
            grid.append(row)
        
        # Read columns in the order specified by the key
        encrypted = ''
        for col_index in self.key_order:
            for row in grid:
                encrypted += row[col_index]
        
        return encrypted
