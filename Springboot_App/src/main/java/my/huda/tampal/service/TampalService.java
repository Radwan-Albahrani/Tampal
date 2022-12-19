package my.huda.tampal.service;

import my.huda.tampal.protos.TampalProtos.*;

public class TampalService {
    public static int id = 0;

    public APIResponse createPaste(CreatePasteRequest request) {
        Paste paste = request.getPaste();
        int userID = request.getUserID();

        // TODO get user from database and add paste to that user
        User.Builder temp = User.newBuilder().setUsername("username").setPassword("password").setEmail("email");
        temp.setUserID(userID);
        temp.addPastes(paste);

        User user = temp.build();
        String message = "Paste created successfully and added to user with ID: " + userID;
        APIResponse response = APIResponse.newBuilder().setCode(ResponseCode.OK).setMessage(message).build();
        return response;
    }

    public APIResponse createUser(CreateUserRequest request) {
        // Get info from request
        String username = request.getUsername();
        String password = request.getPassword();
        String email = request.getEmail();

        // Create a new user
        User.Builder temp = User.newBuilder().setUsername(username).setPassword(password).setEmail(email);
        // TODO create generator for IDs or set IDs incrementally
        temp.setUserID(id++);
        User user = temp.build();

        // TODO Get all users from a file of some sort or a database
        Users allUsers = Users.newBuilder().addUsers(user).build();

        APIResponse response = APIResponse.newBuilder().setCode(ResponseCode.OK)
                .setMessage("User Created Successfully")
                .build();
        return response;
    }

    public APIResponse deletePaste(DeletePasteRequest request) {
        int PasteID = request.getPasteID();
        int userID = request.getUserID();

        // TODO get user from database
        User.Builder temp = User.newBuilder().setUsername("username").setPassword("password").setEmail("email");
        temp.setUserID(userID);
        temp.addPastes(Paste.newBuilder().setPasteID(PasteID).setTitle("My First Paste").setContent("Paste Content")
                .setDate("2022-02-02").build());

        User user = temp.build();

        // TODO delete paste from user
        User.Builder tempUser = user.toBuilder();
        for (int i = 0; i < user.getPastesCount(); i++) {
            if (user.getPastes(i).getPasteID() == PasteID) {
                tempUser.removePastes(i);
                break;
            }
        }
        user = tempUser.build();

        String message = "Paste deleted successfully from user with ID: " + userID;
        APIResponse response = APIResponse.newBuilder().setCode(ResponseCode.OK).setMessage(message).build();
        return response;
    }

    public Paste getPaste(GetPasteRequest request) {
        int PasteID = request.getPasteID();
        int userID = request.getUserID();

        // TODO get user from database
        User.Builder temp = User.newBuilder().setUsername("username").setPassword("password").setEmail("email");
        temp.setUserID(userID);
        temp.addPastes(
                Paste.newBuilder().setPasteID(PasteID).setTitle("My First Paste").setContent("Paste Content")
                        .setDate("2022-02-02").build());

        User user = temp.build();

        // TODO get paste from user
        Paste paste = user.getPastesList().stream().filter(p -> p.getPasteID() == PasteID).findFirst().get();
        return paste;

    }

    public UserResponse getUser(GetUserRequest request) {
        int userID = request.getUserID();

        // TODO get user from database
        UserResponse.Builder temp = UserResponse.newBuilder().setUsername("username").setEmail("email");
        temp.setUserID(userID);
        temp.addPastes(Paste.newBuilder().setPasteID(0).setTitle("My First Paste").setContent("Paste Content")
                .setDate("2022-02-02").build());

        UserResponse user = temp.build();
        return user;
    }

    public Paste updatePaste(UpdatePasteRequest request) {
        int PasteID = request.getPasteID();
        int userID = request.getUserID();
        Paste paste = request.getPaste();

        // TODO get user from database
        User.Builder temp = User.newBuilder().setUsername("username").setPassword("password").setEmail("email");
        temp.setUserID(userID);
        temp.addPastes(Paste.newBuilder().setPasteID(PasteID).setTitle("My First Paste").setContent("Paste Content")
                .setDate("2022-02-02").build());

        User user = temp.build();

        // TODO update paste from user
        User.Builder tempUser = user.toBuilder();
        for (int i = 0; i < user.getPastesCount(); i++) {
            if (user.getPastes(i).getPasteID() == PasteID) {
                tempUser.setPastes(i, paste);
                break;
            }
        }
        return paste;
    }

}
