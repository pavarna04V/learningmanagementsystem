from flask import Blueprint, request, jsonify

from extensions import db

from models import (
    Admin,
    Student,
    Course,
    Enrollment,
    CourseLevel,
    StudentLevel
)

routes = Blueprint(
    "routes",
    __name__
)

# =====================================================
# ADMIN LOGIN
# =====================================================

@routes.route(
    "/admin/login",
    methods=["POST"]
)
def admin_login():

    try:

        data = request.get_json()

        admin = Admin.query.filter_by(

            email=data["email"],

            password=data["password"]

        ).first()

        if admin:

            return jsonify({

                "message":"Admin Login Success"

            }), 200

        return jsonify({

            "message":"Invalid Admin Credentials"

        }), 401

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# STUDENT REGISTER
# =====================================================

@routes.route(
    "/student/register",
    methods=["POST"]
)
def student_register():

    try:

        data = request.get_json()

        existing = Student.query.filter_by(

            email=data["email"]

        ).first()

        if existing:

            return jsonify({

                "message":"Email Already Exists"

            }), 400

        student = Student(

            student_name=data["student_name"],

            email=data["email"],

            password=data["password"]
        )

        db.session.add(student)

        db.session.commit()

        return jsonify({

            "message":"Student Registered"

        }), 201

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# STUDENT LOGIN
# =====================================================

@routes.route(
    "/student/login",
    methods=["POST"]
)
def student_login():

    try:

        data = request.get_json()

        student = Student.query.filter_by(

            email=data["email"],

            password=data["password"]

        ).first()

        if student:

            return jsonify({

                "student":{

                    "id":student.id,

                    "student_name":student.student_name,

                    "email":student.email
                }

            }), 200

        return jsonify({

            "message":"Invalid Credentials"

        }), 401

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# GET STUDENTS
# =====================================================

@routes.route(
    "/students",
    methods=["GET"]
)
def get_students():

    students = Student.query.all()

    result = []

    for s in students:

        result.append({

            "id":s.id,

            "student_name":s.student_name,

            "email":s.email
        })

    return jsonify(result), 200


# =====================================================
# ADD STUDENT
# =====================================================

@routes.route(
    "/students",
    methods=["POST"]
)
def add_student():

    try:

        data = request.get_json()

        student = Student(

            student_name=data["student_name"],

            email=data["email"],

            password=data["password"]
        )

        db.session.add(student)

        db.session.commit()

        return jsonify({

            "message":"Student Added"

        }), 201

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# UPDATE STUDENT
# =====================================================

@routes.route(
    "/students/<int:id>",
    methods=["PUT"]
)
def update_student(id):

    try:

        student = Student.query.get(id)

        data = request.get_json()

        student.student_name = data["student_name"]

        student.email = data["email"]

        student.password = data["password"]

        db.session.commit()

        return jsonify({

            "message":"Student Updated"

        }), 200

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# DELETE STUDENT
# =====================================================

@routes.route(
    "/students/<int:id>",
    methods=["DELETE"]
)
def delete_student(id):

    try:

        student = Student.query.get(id)

        db.session.delete(student)

        db.session.commit()

        return jsonify({

            "message":"Student Deleted"

        }), 200

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# GET COURSES
# =====================================================

@routes.route(
    "/courses",
    methods=["GET"]
)
def get_courses():

    try:

        courses = Course.query.all()

        result = []

        for c in courses:

            result.append({

                "id":c.id,

                "course_name":c.course_name,

                "duration":c.duration,

                "trainer_name":c.trainer_name,

                "image":c.image,

                "description":c.description
            })

        return jsonify(result), 200

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# ADD COURSE
# =====================================================

@routes.route(
    "/courses",
    methods=["POST"]
)
def add_course():

    try:

        data = request.get_json()

        course = Course(

            course_name=data["course_name"],

            duration=data["duration"],

            trainer_name=data["trainer_name"],

            image=data["image"],

            description=data["description"]
        )

        db.session.add(course)

        db.session.commit()

        return jsonify({

            "message":"Course Added"

        }), 201

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# UPDATE COURSE
# =====================================================

@routes.route(
    "/courses/<int:id>",
    methods=["PUT"]
)
def update_course(id):

    try:

        course = Course.query.get(id)

        data = request.get_json()

        course.course_name = data["course_name"]

        course.duration = data["duration"]

        course.trainer_name = data["trainer_name"]

        course.image = data["image"]

        course.description = data["description"]

        db.session.commit()

        return jsonify({

            "message":"Course Updated"

        }), 200

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# DELETE COURSE
# =====================================================

@routes.route(
    "/courses/<int:id>",
    methods=["DELETE"]
)
def delete_course(id):

    try:

        course = Course.query.get(id)

        db.session.delete(course)

        db.session.commit()

        return jsonify({

            "message":"Course Deleted"

        }), 200

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# START COURSE
# =====================================================

@routes.route(
    "/start-course",
    methods=["POST"]
)
def start_course():

    try:

        data = request.get_json()

        student_id = data["student_id"]

        course_id = data["course_id"]

        existing = Enrollment.query.filter_by(

            student_id=student_id,

            course_id=course_id

        ).first()

        if existing:

            return jsonify({

                "message":"Already Started"

            }), 200

        enrollment = Enrollment(

            student_id=student_id,

            course_id=course_id,

            progress=0,

            score=0,

            badge="Beginner",

            rank=0,

            status="Started"
        )

        db.session.add(enrollment)

        db.session.commit()

        return jsonify({

            "message":"Course Started"

        }), 201

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# GET COURSE LEVELS
# =====================================================

@routes.route(
    "/course-levels/<int:course_id>",
    methods=["GET"]
)
def get_course_levels(course_id):

    try:

        levels = CourseLevel.query.filter_by(

            course_id=course_id

        ).all()

        result = []

        for level in levels:

            result.append({

                "id":level.id,

                "level_name":level.level_name,

                "topic":level.topic,

                "notes":level.notes,

                "assignment":level.assignment,

                "level_score":level.level_score
            })

        return jsonify(result), 200

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# ADD COURSE LEVEL
# =====================================================

@routes.route(
    "/course-level",
    methods=["POST"]
)
def add_course_level():

    try:

        data = request.get_json()

        level = CourseLevel(

            course_id=data["course_id"],

            level_name=data["level_name"],

            topic=data["topic"],

            notes=data["notes"],

            assignment=data["assignment"],

            level_score=data["level_score"]
        )

        db.session.add(level)

        db.session.commit()

        return jsonify({

            "message":"Level Added"

        }), 201

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# COMPLETE LEVEL
# =====================================================

@routes.route(
    "/complete-level",
    methods=["POST"]
)
def complete_level():

    try:

        data = request.get_json()

        existing = StudentLevel.query.filter_by(

            student_id=data["student_id"],

            level_id=data["level_id"]

        ).first()

        if existing:

            return jsonify({

                "message":"Already Completed"

            }), 400

        level = StudentLevel(

            student_id=data["student_id"],

            course_id=data["course_id"],

            level_id=data["level_id"],

            completed=True,

            obtained_score=data["obtained_score"]
        )

        db.session.add(level)

        enrollment = Enrollment.query.filter_by(

            student_id=data["student_id"],

            course_id=data["course_id"]

        ).first()

        if enrollment:

            enrollment.progress += 33

            enrollment.score += data["obtained_score"]

            if enrollment.progress >= 100:

                enrollment.progress = 100

                enrollment.status = "Completed"

                enrollment.badge = "Gold"

            else:

                enrollment.status = "In Progress"

                enrollment.badge = "Silver"

        db.session.commit()

        return jsonify({

            "message":"Level Completed"

        }), 200

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500


# =====================================================
# STUDENT TRACKING
# =====================================================

@routes.route(
    "/student/tracking/<int:id>",
    methods=["GET"]
)
def student_tracking(id):

    try:

        enrollments = Enrollment.query.filter_by(

            student_id=id

        ).all()

        result = []

        for e in enrollments:

            course = Course.query.get(
                e.course_id
            )

            result.append({

                "course_name":course.course_name,

                "progress":e.progress,

                "score":e.score,

                "badge":e.badge,

                "status":e.status
            })

        return jsonify(result), 200

    except Exception as e:

        print(e)

        return jsonify({

            "message":str(e)

        }), 500