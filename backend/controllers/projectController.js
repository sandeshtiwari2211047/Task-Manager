const Project = require("../models/Project");

const Task = require("../models/Task");

// CREATE PROJECT
exports.createProject = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
    } = req.body;

    const project =
      await Project.create({

        title,

        description,

        createdBy:
          req.user.id,
      });

    res.status(201).json({

      message:
        "Project Created",

      project,
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,
    });

  }
};

// GET PROJECTS
exports.getProjects = async (
  req,
  res
) => {

  try {

    let projects;

    // ADMIN → SEE ALL PROJECTS
    if (
      req.user.role === "Admin"
    ) {

      projects =
        await Project.find()

          .populate(
            "createdBy",
            "name"
          )

          .lean();

    }

    // MEMBER → SEE ONLY OWN PROJECTS
    else {

      projects =
        await Project.find({
          createdBy:
            req.user.id,
        })

          .populate(
            "createdBy",
            "name"
          )

          .lean();
    }

    // ADD TASK COUNT
    for (
      let project of projects
    ) {

      const taskCount =
        await Task.countDocuments({

          project:
            project._id,
        });

      project.taskCount =
        taskCount;
    }

    res.status(200).json(
      projects
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,
    });

  }
};