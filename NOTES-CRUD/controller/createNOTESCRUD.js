import Notes from "../models/Notes.model.js";
import logger from "../utils/logger/logger.js";
import CreateRedisClient from "../utils/redisclient/redisClient.js";
import userIDExtractor from "../utils/userIDextractor/useridExt.js";
const CreateNOTES=async (req,res)=>{

  const createdBy=userIDExtractor(req);
  const { title, description } = req.body;
  if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
  try {
    const newNotes=new Notes({
      title,
      description,
      userId:createdBy
    })
    try {
      await newNotes.save()
      logger.info("Notes Created Successfully")
      res.status(201).json({
        success: true,
        message: "Notes Created Successfully",
      })
    } catch (error) {
      logger.error(error)
      res.status(500).json({
        success: false,
        message: "Error Creating Notes",
      })
    }
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

const client=CreateRedisClient();

const GetNotes = async (req, res) => {
  const userId = userIDExtractor(req);
  const cacheKey = `notes:${userId}`;

  try {
    const cachedNotes = await client.get(cacheKey);

    if (cachedNotes) {
      logger.info(`Cache HIT for user ${userId}`);
      return res.status(200).json({
        success: true,
        source: "cache",
        data: JSON.parse(cachedNotes),
      });
    }

    const notes = await Notes.find({ userId });

    await client.set(
      cacheKey,
      JSON.stringify(notes),
      "EX",
      120
    );

    logger.info(`Cache MISS → DB fetch for user ${userId}`);

    return res.status(200).json({
      success: true,
      source: "db",
      data: notes,
    });
  } catch (error) {
    logger.error("Error fetching notes", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteNotes=async (req,res)=>{
  logger.info("Notes Deleted started")
  try {
    const Notesdata=await Notes.findByIdAndDelete(req.params.id)
    logger.info("Notes Deleted Successfully")
    res.status(200).json({
      success: true,
      message: "Notes Deleted Successfully",
      data:Notesdata
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

const updateNotes =async (req, res) => {
  logger.info("Notes Updated started")
  try {
    const Notesdata = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    logger.info("Notes Updated Successfully")
    res.status(200).json({
      success: true,
      message: "Notes Updated Successfully",
      data: Notesdata,
    });
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export { CreateNOTES, deleteNotes, GetNotes, updateNotes };
