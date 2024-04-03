from flask import Flask, flash, redirect, render_template, request, session

# Configure application
app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():