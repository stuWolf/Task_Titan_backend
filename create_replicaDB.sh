#!/bin/bash
# Make the script executable: chmod +x create_replicaDB.sh
# Run the script: ./create_replicaDB.sh
# Step 2.1: Prepare the Environment
mkdir -p /data/rs1 /data/rs2 /data/rs3
echo "Directories for replica set members created."

# Step 3: Start the MongoDB Instances
# Note: This assumes you have MongoDB installed and the `mongod` command is available in your PATH.

# Start the first member
mongod --port 27017 --dbpath /data/rs1 --replSet myReplicaSet --fork --logpath /data/rs1.log
echo "First member started on port 27017."

# Start the second member
mongod --port 27018 --dbpath /data/rs2 --replSet myReplicaSet --fork --logpath /data/rs2.log
echo "Second member started on port 27018."

# Start the third member
mongod --port 27019 --dbpath /data/rs3 --replSet myReplicaSet --fork --logpath /data/rs3.log
echo "Third member started on port 27019."

# Step 4: Initialize the Replica Set
# Note: This assumes you have the MongoDB client (`mongo`) installed.

echo "Initializing the replica set..."
mongo --port 27017 <<EOF
rs.initiate({
   _id: "myReplicaSet",
   members: [
      { _id: 0, host: "localhost:27017" },
      { _id: 1, host: "localhost:27018" },
      { _id: 2, host: "localhost:27019" }
   ]
})
EOF

echo "Replica set initialized. You can check its status with 'rs.status()' in the mongo shell."
