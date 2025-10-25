# Easy Form

A simple, vanilla JavaScript form library built with custom HTML elements. Easy Form provides automatic validation, smart submit button management, and type-safe form value extraction.

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
npm install
```

## Running the Project

To run the project in development mode:

```bash
npm run start
```

This starts a development server on port 3000 (configurable via `.env`).

## Building the Project

To build for production:

```bash
npm run build
```

This creates a `dist` folder with bundled and optimized files.

## Usage

### Basic Form Example

```html path=null start=null
<easy-form>
  <easy-input name="username" type="text" label="Username" required></easy-input>
  <easy-input name="email" type="email" label="Email Address" required></easy-input>
  <easy-input name="message" type="textarea" label="Message"></easy-input>
  <easy-input name="submit" type="submit"></easy-input>
</easy-form>

<script>
  const form = document.querySelector('easy-form');
  form.on('submit', (values) => {
    console.log('Form submitted:', values);
    // values = { username: "...", email: "...", message: "..." }
  });
</script>
```

### Components

#### `<easy-form>`

A form container that automatically manages form validation and submission.

**Features:**
- Automatically enables/disables submit button based on validation
- Collects all form values into a structured object
- Emits a custom `submit` event with form data
- Validates all `<easy-input>` elements within the form

**Events:**
- `submit` - Fired when form is submitted with valid data
  - Detail: Object containing all form values keyed by input names

**Example:**
```html path=null start=null
<easy-form>
  <!-- form inputs here -->
</easy-form>

<script>
  document.querySelector('easy-form').on('submit', (data) => {
    // Handle form submission
  });
</script>
```

#### `<easy-input>`

An enhanced input wrapper that provides labels, validation, and styling hooks.

**Attributes:**
- `name` (required) - The input name (used as key in form values)
- `type` - Input type: `text`, `email`, `url`, `number`, `tel`, `textarea`, `submit`
- `label` - Label text (defaults to the `name` attribute)
- `required` - Marks the field as required

**Supported Input Types:**
- `text` - Standard text input
- `email` - Email with validation
- `url` - URL with validation
- `number` - Number input (returns as Number type)
- `tel` - Telephone with basic validation
- `textarea` - Multi-line text input
- `submit` - Submit button
- `checkbox` - Checkbox (returns as Boolean)
- `range` - Range slider (returns as Number)

**Validation:**
- Validates on `input` and `blur` events
- Adds `invalid-input` class when validation fails
- Email: Standard email format validation
- URL: Valid URL format validation
- Number: Numeric value validation
- Tel: Basic telephone format validation

**CSS Classes:**
- `.required` - Added to required fields
- `.invalid-input` - Added when validation fails
- `.easy-label` - Applied to generated labels
- `.easy-input` - Applied to generated inputs

**Examples:**

```html path=null start=null
<!-- Text input with label -->
<easy-input name="username" type="text" label="Username" required></easy-input>

<!-- Email with validation -->
<easy-input name="email" type="email" required></easy-input>

<!-- Textarea -->
<easy-input name="bio" type="textarea" label="Tell us about yourself"></easy-input>

<!-- Number input -->
<easy-input name="age" type="number" label="Age"></easy-input>

<!-- Submit button -->
<easy-input name="submit" type="submit"></easy-input>
```

### Form Values

Form values are automatically typed based on input type:
- `text`, `email`, `url`, `tel`, `textarea` → String
- `number`, `range` → Number
- `checkbox` → Boolean

```javascript path=null start=null
form.on('submit', (values) => {
  // values = {
  //   username: "john_doe",      // String
  //   age: 25,                   // Number
  //   newsletter: true,          // Boolean
  //   message: "Hello world"     // String
  // }
});
```

## Styling Recommendations

### Basic Styling

Target the generated classes to style your forms:

```css path=null start=null
/* Input wrapper styling */
easy-input {
  display: block;
  margin-bottom: 1rem;
}

/* Label styling */
.easy-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

/* Input field styling */
.easy-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.easy-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

/* Textarea specific */
textarea.easy-input {
  min-height: 100px;
  resize: vertical;
}
```

### Validation States

```css path=null start=null
/* Required field indicator */
easy-input.required .easy-label::after {
  content: " *";
  color: #dc3545;
}

/* Invalid input styling */
easy-input.invalid-input .easy-input {
  border-color: #dc3545;
  background-color: #fff5f5;
}

easy-input.invalid-input .easy-label {
  color: #dc3545;
}

/* Optional: Add validation message */
easy-input.invalid-input::after {
  content: "Please enter a valid value";
  display: block;
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

### Submit Button

```css path=null start=null
.easy-input.submit {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.easy-input.submit:hover:not(:disabled) {
  background-color: #0056b3;
}

.easy-input.submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Form Layout

```css path=null start=null
easy-form {
  display: block;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}
```

## Advanced Example

```html path=null start=null
<easy-form>
  <easy-input name="username" type="text" label="Username" required></easy-input>
  <easy-input name="email" type="email" label="Email Address" required></easy-input>
  <easy-input name="website" type="url" label="Website"></easy-input>
  <easy-input name="phone" type="tel" label="Phone Number"></easy-input>
  <easy-input name="age" type="number" label="Age" required></easy-input>
  <easy-input name="bio" type="textarea" label="Biography"></easy-input>
  <easy-input name="newsletter" type="checkbox" label="Subscribe to newsletter"></easy-input>
  <easy-input name="submit" type="submit"></easy-input>
</easy-form>

<script>
  const form = document.querySelector('easy-form');
  
  form.on('submit', async (values) => {
    console.log('Submitting:', values);
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      
      if (response.ok) {
        console.log('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Submission failed:', error);
    }
  });
</script>
```

## Configuration

Customize the build output using a `.env` file:

```env path=null start=null
OUTPUT_FILE_NAME=easy-form.min.js
PORT=8080
```
