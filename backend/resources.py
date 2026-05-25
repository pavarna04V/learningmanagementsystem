from flask import request, jsonify

from models import (
    Student,
    Course,
    Admin
)

from extensions import db


def admin_login_resource():

    data = request.json

    admin = Admin.query.filter_by(
        username=data["username"],
        password=data["password"]
    ).first()

    if admin:

        return jsonify({
            "message": "Admin Login Success"
        })

    return jsonify({
        "message": "Invalid Credentials"
    })


def student_login_resource():

    data = request.json

    student = Student.query.filter_by(
        username=data["username"],
        password=data["password"]
    ).first()

    if student:

        return jsonify({
            "message": "Login Success"
        })

    return jsonify({
        "message": "Invalid Credentials"
    })