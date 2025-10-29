from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "pawconnect_secret_key"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/adoption')
def adoption():
    pet_type = request.args.get('type', '')

    pets = [
        {"name": "Max", "breed": "Golden Retriever", "age": 2, "type": "dog", "image": "dog1.jpg", "healthStatus": "Healthy", "vaccination": "Yes"},
        {"name": "Milo", "breed": "Persian Cat", "age": 1, "type": "cat", "image": "cat1.jpg", "healthStatus": "Healthy", "vaccination": "Yes"},
        {"name": "Coco", "breed": "Parrot", "age": 3, "type": "bird", "image": "bird1.jpg", "healthStatus": "Good", "vaccination": "Yes"}
    ]

    if pet_type:
        pets = [pet for pet in pets if pet["type"].lower() == pet_type.lower()]

    return render_template('adoption.html', pets=pets, selected_type=pet_type)

@app.route('/pet_cafe')
def pet_cafe():
    return render_template('pet_cafe.html')

@app.route('/volunteer', methods=['GET', 'POST'])
def volunteer():
    if request.method == 'POST':
        name = request.form['full_name']
        flash(f"Thank you {name}! Your volunteer form has been submitted.", "success")
        return redirect(url_for('volunteer'))
    return render_template('volunteer.html')

@app.route('/donation', methods=['GET', 'POST'])
def donation():
    if request.method == 'POST':
        name = request.form['full_name']
        amount = request.form['amount']
        flash(f"Thank you {name} for donating ₹{amount}! ❤️", "success")
        return redirect(url_for('donation'))
    return render_template('donation.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        flash(f"Thanks {name}! We'll get back to you soon.", "info")
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
