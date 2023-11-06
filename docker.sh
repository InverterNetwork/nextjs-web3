#!/bin/bash

ENV_FILE="./.env"               # Set the default path to the .env file
TEMP_ENV_FILE="./temp_env_file" # Temporary environment file

function select_prefix() {
    # Query available options from Docker images
    AVAILABLE_OPTIONS=($(docker images --format "{{.Repository}}" | sort -u))

    # Display available options with numbers
    echo "Choose an option from the following:"
    echo "0) Custom prefix"
    for i in "${!AVAILABLE_OPTIONS[@]}"; do
        echo "$((i + 1))) ${AVAILABLE_OPTIONS[i]}"
    done

    read -p "Enter the number of your choice: " OPTION_NUMBER

    # Validate the input
    if ! [[ "$OPTION_NUMBER" =~ ^[0-9]+$ ]] || ((OPTION_NUMBER < 0)) || ((OPTION_NUMBER > ${#AVAILABLE_OPTIONS[@]})); then
        echo "Invalid input. Please select a valid number."
        exit 1
    fi

    if [ "$OPTION_NUMBER" -eq 0 ]; then
        read -p "Enter the container name prefix: " PREFIX
        read -p "Enter the container tag: " TAG
        PREFIX_TAG="$PREFIX:$TAG"
    else
        PREFIX="${AVAILABLE_OPTIONS[OPTION_NUMBER - 1]}"
        read -p "Enter the tag for the image: " TAG
        PREFIX_TAG="$PREFIX:$TAG"
    fi
}

function build_image() {
    export $(cat .env | xargs)
    docker build \
        --build-arg ENV=$NEXT_PUBLIC_ENV \
        --build-arg DYNAMIC_ID=$NEXT_PUBLIC_DYNAMIC_ID \
        -t $PREFIX_TAG .
}

function list_images() {
    docker images
}

function remove_image() {
    docker rmi $PREFIX_TAG
}

function start_container() {
    read -p "Enter the port to run container on: " CUSTOM_PORT
    docker run -d -p 8080:$CUSTOM_PORT $PREFIX_TAG

    # Clean up temporary environment file
    rm $TEMP_ENV_FILE

    echo "Do you want to view the logs? (y/n)"
    read VIEW_LOGS

    if [ "$VIEW_LOGS" == "y" ]; then
        view_logs
    fi
}

function list_containers() {
    docker ps
}

function stop_container() {
    docker stop $(docker ps -aq --filter ancestor=$PREFIX_TAG)
}

function remove_container() {
    docker rm $(docker ps -aq --filter ancestor=$PREFIX_TAG)
}

function view_logs() {
    CONTAINER_ID=$(docker ps -q --filter ancestor=$PREFIX_TAG)

    if [ -z "$CONTAINER_ID" ]; then
        echo "No active containers found for the specified image tag."
    else
        docker logs $CONTAINER_ID
    fi
}

function remove_unused_images() {
    echo "Removing images without a name or tag..."
    docker rmi $(docker images | grep "<none>" | awk '{print $3}')
}

function remove_inactive_containers() {
    echo "Removing inactive containers..."
    docker container prune -f
}

echo "1. List images"
echo "2. List running containers"
echo "3. View logs"
echo "4. Build image"
echo "5. Remove image"
echo "6. Start container"
echo "7. Stop container"
echo "8. Remove container"
echo "9. Build & Start"
echo "10. Remove images without name or tag"
echo "11. Remove inactive containers"
echo "Enter your choice:"
read CHOICE

case $CHOICE in
1)
    list_images
    ;;
2)
    list_containers
    ;;
3)
    select_prefix
    view_logs
    ;;
4)
    select_prefix
    build_image
    ;;
5)
    select_prefix
    remove_image
    ;;
6)
    select_prefix
    start_container
    ;;
7)
    select_prefix
    stop_container
    ;;
8)
    select_prefix
    remove_container
    ;;
9)
    select_prefix
    build_image
    start_container
    ;;
10)
    remove_unused_images
    ;;
11)
    remove_inactive_containers
    ;;
*)
    echo "Invalid choice. Please select a valid option."
    ;;
esac
