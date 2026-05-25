from extensions import db


# =========================================
# ADMIN TABLE
# =========================================

class Admin(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    email = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(100),
        nullable=False
    )


# =========================================
# STUDENT TABLE
# =========================================

class Student(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    student_name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(100),
        nullable=False
    )


# =========================================
# COURSE TABLE
# =========================================

class Course(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    course_name = db.Column(
        db.String(100),
        nullable=False
    )

    duration = db.Column(
        db.String(100),
        nullable=False
    )

    trainer_name = db.Column(
        db.String(100),
        nullable=False
    )

    image = db.Column(
        db.Text,
        nullable=True
    )

    description = db.Column(
        db.Text,
        nullable=True
    )


# =========================================
# ENROLLMENT TABLE
# =========================================

class Enrollment(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    student_id = db.Column(
        db.Integer,
        nullable=False
    )

    course_id = db.Column(
        db.Integer,
        nullable=False
    )

    progress = db.Column(
        db.Integer,
        default=0
    )

    score = db.Column(
        db.Integer,
        default=0
    )

    badge = db.Column(
        db.String(100),
        default="Beginner"
    )

    rank = db.Column(
        db.Integer,
        default=0
    )

    status = db.Column(
        db.String(100),
        default="Started"
    )


# =========================================
# COURSE LEVEL TABLE
# =========================================

class CourseLevel(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    course_id = db.Column(
        db.Integer,
        nullable=False
    )

    level_name = db.Column(
        db.String(100),
        nullable=False
    )

    topic = db.Column(
        db.String(200),
        nullable=False
    )

    notes = db.Column(
        db.Text,
        nullable=False
    )

    assignment = db.Column(
        db.Text,
        nullable=False
    )

    level_score = db.Column(
        db.Integer,
        default=10
    )


# =========================================
# STUDENT LEVEL TABLE
# =========================================

class StudentLevel(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    student_id = db.Column(
        db.Integer,
        nullable=False
    )

    course_id = db.Column(
        db.Integer,
        nullable=False
    )

    level_id = db.Column(
        db.Integer,
        nullable=False
    )

    completed = db.Column(
        db.Boolean,
        default=False
    )

    obtained_score = db.Column(
        db.Integer,
        default=0
    )