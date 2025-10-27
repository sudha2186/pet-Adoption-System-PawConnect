from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "pawconnect_secret_key"  # Needed for flash messages

# -----------------------------
# 🏠 Home Page
# -----------------------------
@app.route('/')
def index():
    return render_template('index.html')


# -----------------------------
# 🐶 Adoption Page
# -----------------------------
@app.route('/adoption')
def adoption():
    # Sample pet data (you can replace this later with DB data)
    pets = [
        {'name': 'Buddy', 'breed': 'Golden Retriever', 'age': 2, 'image': 'dog1.jpg'},
        {'name': 'Milo', 'breed': 'Persian Cat', 'age': 1, 'image': 'cat1.jpg'},
        {'name': 'Charlie', 'breed': 'Labrador', 'age': 3, 'image': 'dog2.jpg'}
    ]
    return render_template('adoption.html', pets=pets)


# -----------------------------
# ☕ Pet Café
# -----------------------------
@app.route('/pet_cafe')
def pet_cafe():
    return render_template('pet_cafe.html')


# -----------------------------
# 🙋 Volunteer Page
# -----------------------------
@app.route('/volunteer', methods=['GET', 'POST'])
def volunteer():
    if request.method == 'POST':
        name = request.form['full_name']
        email = request.form['email']
        phone = request.form.get('phone', '')
        reason = request.form['reason']
        flash(f"Thank you {name}! Your volunteer form has been submitted.", "success")
        return redirect(url_for('volunteer'))
    return render_template('volunteer.html')


# -----------------------------
# 💝 Donation Page
# -----------------------------
@app.route('/donation', methods=['GET', 'POST'])
def donation():
    if request.method == 'POST':
        name = request.form['full_name']
        amount = request.form['amount']
        flash(f"Thank you {name} for donating ₹{amount}! ❤️", "success")
        return redirect(url_for('donation'))
    return render_template('donation.html')


# -----------------------------
# ✉️ Contact Page
# -----------------------------
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        flash(f"Thanks {name}! We'll get back to you soon.", "info")
        return redirect(url_for('contact'))
    return render_template('contact.html')


# -----------------------------
# 🔐 Login / Register Pages
# -----------------------------
@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')


# -----------------------------
# 🚀 Run the App
# -----------------------------
if __name__ == '__main__':
    app.run(debug=True)
