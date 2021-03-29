<?php

namespace Src\TableGateways;

class UserGateway
{

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll(array $input)
    {

        $statement = "
            SELECT
                SQL_CALC_FOUND_ROWS
                *
            FROM
                users
            WHERE username LIKE :name
            AND created BETWEEN :afterDate AND :beforeDate
        ";
        $executeArray = [
            ':offset' => $input['offset'] ? (int)$input['offset'] : 0,
            ':limit' => $input['limit'] ? (int)$input['limit'] : 150,
            ':afterDate' => $input['filter']['afterDate'] ?? '1000-01-01 00:00:00',
            ':beforeDate' => $input['filter']['beforeDate'] ?? date("Y-m-d H:i:s", (time() + 86400)),
            ':name' => $input['filter']['name'] ?? '%',
        ];

        $statement .= "\tLIMIT :limit OFFSET :offset;";

        try {
            $statement = $this->db->prepare($statement);

            foreach ($executeArray as $key => $value) {
                $statement->bindValue($key, $value, is_string($value) ? \PDO::PARAM_STR : \PDO::PARAM_INT);
            }

            $statement->execute();
            $count = $this->db->query('SELECT FOUND_ROWS();')->fetch(\PDO::FETCH_NUM)[0];
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return ['data' => $result, 'count' => (int)$count];
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }

    }

    public function find($id)
    {

        $statement = "
            SELECT 
                id, username, first_name, last_name, email, gender, created, modified
            FROM
                users
            WHERE id = ?;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute([$id]);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }

    }

    public function insert(array $input)
    {

        $statement = "
            INSERT INTO users 
                (username, first_name, last_name, email, gender)
            VALUES
                (:username, :first_name, :last_name, :email, :gender);
        ";

        try {
            $statement = $this->db->prepare($statement);
            $result = $statement->execute([
                ':username' => $input['username'],
                ':first_name' => $input['first_name'],
                ':last_name' => $input['last_name'],
                ':email' => $input['email'],
                ':gender' => $input['gender'],
            ]);

            return $result ? $this->db->lastInsertId() : 'Failed to add new user';
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }

    }

    public function update($id, array $input)
    {

        $statement = "
            UPDATE users
            SET 
                username = :username,
                first_name = :first_name,
                last_name  = :last_name,
                email = :email,
                gender = :gender
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $res = $statement->execute([
                ':id' => (int)$id,
                ':username' => $input['username'],
                ':first_name' => $input['first_name'],
                ':last_name' => $input['last_name'],
                ':email' => $input['email'],
                ':gender' => $input['gender'],
            ]);

            return $res ? "User $id updated" : "User $id not updated";
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }

    }

    public function delete($id)
    {

        $statement = "
            DELETE FROM users
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $result = $statement->execute(['id' => $id]);

            return $result ? "User $id deleted" : "User $id not deleted";
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }

    }

}