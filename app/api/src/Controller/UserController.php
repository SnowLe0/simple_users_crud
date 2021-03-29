<?php

namespace Src\Controller;

use Src\TableGateways\UserGateway;

class UserController
{

    private $db;
    private $uriQuery;
    private $requestMethod;
    private $userId;

    private $userGateway;

    public function __construct($db, $uriQuery, $requestMethod, $userId)
    {

        $this->db = $db;
        $this->uriQuery = $uriQuery;
        $this->requestMethod = $requestMethod;
        $this->userId = $userId;

        $this->userGateway = new UserGateway($db);

    }

    public function processRequest()
    {

        switch ($this->requestMethod) {
            case 'GET':
                if ($this->userId) {
                    $response = $this->getUser($this->userId);
                } else {
                    $response = $this->getAllUsers($this->uriQuery);
                }
                break;
            case 'POST':
                $response = $this->createUserFromRequest();
                break;
            case 'PUT':
                $response = $this->updateUserFromRequest($this->userId);
                break;
            case 'DELETE':
                $response = $this->deleteUser($this->userId);
                break;
            case 'OPTIONS':
                $response['status_code_header'] = 'HTTP/1.1 200 OK';
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }

        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }

    }

    private function getAllUsers($query)
    {

        $result = $this->userGateway->findAll($query);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;

    }

    private function getUser($id)
    {

        $result = $this->userGateway->find($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;

    }

    private function createUserFromRequest()
    {

        $input = (array)json_decode(file_get_contents('php://input'), TRUE);

        if (!$this->validateUser($input)) {
            return $this->unprocessableEntityResponse();
        }

        $result = $this->userGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = json_encode($result);
        return $response;

    }

    private function updateUserFromRequest($id)
    {

        $result = $this->userGateway->find($id);

        if (!$result) {
            return $this->notFoundResponse();
        }

        $input = (array)json_decode(file_get_contents('php://input'), TRUE);

        if (!$this->validateUser($input)) {
            return $this->unprocessableEntityResponse();
        }

        $result = $this->userGateway->update($id, $input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;

    }

    private function deleteUser($id)
    {

        $result = $this->userGateway->find($id);

        if (!$result) {
            return $this->notFoundResponse();
        }

        $result = $this->userGateway->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;

    }

    private function validateUser($input)
    {

        if (!isset($input['username']) || empty($input['username'])) {
            return false;
        }

        if (!isset($input['email']) || empty($input['username'])) {
            return false;
        }

        return true;

    }

    private function unprocessableEntityResponse()
    {

        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;

    }

    private function notFoundResponse()
    {

        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;

    }

}