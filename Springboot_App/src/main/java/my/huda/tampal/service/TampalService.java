package my.huda.tampal.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import com.google.protobuf.TextFormat;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.revwalk.RevCommit;

import my.huda.tampal.protos.TampalProtos.*;

public class TampalService
{
    private static final String path = "./src/main/data/users/";

    // Create a paste
    public APIResponse createPaste(CreatePasteRequest request)
    {
        // Get info from request
        Paste paste = request.getPaste();
        int userID = request.getUserID();

        File pasteFile = new File(path + userID + "/pastes/");
        if (!pasteFile.exists())
        {
            return APIResponse.newBuilder().setCode(ResponseCode.NOT_FOUND).setMessage("User does not exist").build();
        }

        // Set the ID and the date of the paste
        int pasteID = pasteFile.list().length;
        paste = paste.toBuilder().setPasteID(pasteID).build();
        paste = paste.toBuilder().setDate(LocalDate.now().toString()).build();
        pasteFile = new File(path + userID + "/pastes/" + paste.getPasteID() + ".txt");
        File userFile = new File(path + userID + "/profile/profile.txt");

        // Create the file and write the paste to it
        try (FileWriter writer = new FileWriter(pasteFile))
        {
            pasteFile.createNewFile();
            TextFormat.Printer printer = TextFormat.printer();
            printer.print(paste, writer);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        // Add the paste to the user's profile
        User.Builder userBuilder = User.newBuilder();
        try (FileReader reader = new FileReader(userFile))
        {
            TextFormat.merge(reader, userBuilder);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        User user = userBuilder.addPastes(paste).build();

        try (FileWriter writer = new FileWriter(userFile))
        {
            TextFormat.Printer printer = TextFormat.printer();
            printer.print(user, writer);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        String message = "Paste created successfully with ID:" + pasteID + ". Added to user with ID: " + userID;
        APIResponse response = APIResponse.newBuilder().setCode(ResponseCode.OK).setMessage(message).build();
        this.createCommit("Created Paste: " + pasteID + " for user: " + userID, userID);
        return response;
    }

    // Create a user
    public APIResponse createUser(CreateUserRequest request)
    {
        // Get info from request
        String username = request.getUsername();
        String password = request.getPassword();
        String email = request.getEmail();

        // Check if any user already exists
        File file = new File(path);
        if (!file.exists())
        {
            file.mkdirs();
        }

        // Double check email and username don't already exist
        File userIndex = new File(path + "usersIndex.txt");
        if (!userIndex.exists())
        {
            try
            {
                userIndex.createNewFile();
                try (FileWriter writer = new FileWriter(userIndex, true))
                {
                    writer.write(username + "\n" + email);
                }
                catch (IOException e)
                {
                    e.printStackTrace();
                }
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
        else
        {
            try (Scanner scanner = new Scanner(userIndex))
            {
                while (scanner.hasNextLine())
                {
                    String line = scanner.nextLine();
                    if (line.equals(username))
                    {
                        return APIResponse.newBuilder().setCode(ResponseCode.PERMISSION_DENIED)
                                .setMessage("User with this username already exists").build();
                    }
                    if (line.equals(email))
                    {
                        return APIResponse.newBuilder().setCode(ResponseCode.PERMISSION_DENIED)
                                .setMessage("User with this email already exists").build();
                    }
                }
                try (FileWriter writer = new FileWriter(userIndex, true))
                {
                    writer.write("\n" + username + "\n" + email);
                }
                catch (IOException e)
                {
                    e.printStackTrace();
                }
            }
            catch (FileNotFoundException e)
            {
                e.printStackTrace();
            }
        }

        // Create a new User
        int userID = file.list().length - 1;
        file = new File(path + userID + "/profile/");
        if (!file.exists())
        {
            file.mkdirs();
        }

        // Create a profile file for the user
        file = new File(path + userID + "/profile/" + "profile.txt");
        try (PrintWriter writer = new PrintWriter(new FileWriter(file));)
        {
            file.createNewFile();
            User user = User.newBuilder().setUsername(username).setPassword(password).setEmail(email).setUserID(userID)
                    .build();
            TextFormat.Printer printer = TextFormat.printer();
            printer.print(user, writer);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        // Create a pastes folder for the user
        file = new File(path + userID + "/pastes/");
        if (!file.exists())
        {
            file.mkdirs();
        }

        APIResponse response = APIResponse.newBuilder().setCode(ResponseCode.OK)
                .setMessage("User Created Successfully")
                .build();
        this.createCommit("Created User: " + username + " with ID: " + userID, userID);
        return response;
    }

    // Delete a Paste
    public APIResponse deletePaste(DeletePasteRequest request)
    {
        // Get info from request
        int PasteID = request.getPasteID();
        int userID = request.getUserID();

        // Check if user exists
        File pasteFile = new File(path + userID + "/pastes/");
        if (!pasteFile.exists())
        {
            return APIResponse.newBuilder().setCode(ResponseCode.NOT_FOUND).setMessage("User does not exist").build();
        }

        // Check if paste exists
        pasteFile = new File(path + userID + "/pastes/" + PasteID + ".txt");
        if (!pasteFile.exists())
        {
            return APIResponse.newBuilder().setCode(ResponseCode.NOT_FOUND).setMessage("Paste does not exist").build();
        }

        // Get the user who owns the paste
        File userFile = new File(path + userID + "/profile/" + "profile.txt");
        User.Builder builder = User.newBuilder();
        try (FileReader reader = new FileReader(userFile))
        {
            TextFormat.getParser().merge(reader, builder);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        // Update the paste in the user
        List<Paste> pastes = builder.getPastesList();
        List<Paste> editablePastes = new ArrayList<>(pastes);
        editablePastes.removeIf(paste -> paste.getPasteID() == PasteID);
        builder.clearPastes();
        builder.addAllPastes(editablePastes);
        User user = builder.build();
        try (FileWriter writer = new FileWriter(userFile))
        {
            TextFormat.Printer printer = TextFormat.printer();
            printer.print(user, writer);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        // Delete the paste
        pasteFile.renameTo(new File(path + userID + "/pastes/" + PasteID + ".txt" + ".deleted"));

        String message = "Paste deleted successfully from user with ID: " + userID;
        APIResponse response = APIResponse.newBuilder().setCode(ResponseCode.OK).setMessage(message).build();
        this.createCommit("Deleted Paste: " + PasteID + " from user with ID: " + userID, userID);
        return response;
    }

    // Get a Paste
    public Paste getPaste(GetPasteRequest request)
    {
        // Get info from request
        int PasteID = request.getPasteID();
        int userID = request.getUserID();

        // Check if user exists
        File file = new File(path + userID + "/pastes/");
        if (!file.exists())
        {
            return Paste.newBuilder().setPasteID(-1).setTitle("User does not exist").build();
        }

        // Check if paste exists
        file = new File(path + userID + "/pastes/" + PasteID + ".txt");
        if (!file.exists())
        {
            return Paste.newBuilder().setPasteID(-1).setTitle("Paste does not exist").build();
        }

        // Get the paste
        Paste.Builder paste = Paste.newBuilder();
        try (FileReader reader = new FileReader(file))
        {
            TextFormat.getParser().merge(reader, paste);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return paste.build();

    }

    // Get a User
    public UserResponse getUser(GetUserRequest request)
    {
        // Get info from request
        int userID = request.getUserID();

        // Check if user exists
        File file = new File(path + userID + "/profile/");
        if (!file.exists())
        {
            return UserResponse.newBuilder().setUsername("User does not exist").setUserID(-1).build();
        }

        // Get the user
        file = new File(path + userID + "/profile/" + "profile.txt");
        User.Builder builder = User.newBuilder();
        try (FileReader reader = new FileReader(file))
        {
            TextFormat.getParser().merge(reader, builder);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        User user = builder.build();
        if (user == null)
        {
            return UserResponse.newBuilder().setUsername("User does not exist").setUserID(-1).build();
        }
        return UserResponse.newBuilder().setUsername(user.getUsername()).setUserID(user.getUserID())
                .addAllPastes(user.getPastesList()).setEmail(user.getEmail()).build();
    }

    // Update a Paste
    public Paste updatePaste(UpdatePasteRequest request)
    {
        // Get info from request
        int PasteID = request.getPasteID();
        int userID = request.getUserID();
        Paste paste = request.getPaste();

        // Check if user exists
        File file = new File(path + userID + "/pastes/");
        if (!file.exists())
        {
            return Paste.newBuilder().setPasteID(-1).setTitle("User does not exist").build();
        }

        // Check if paste exists
        file = new File(path + userID + "/pastes/" + PasteID + ".txt");
        if (!file.exists())
        {
            return Paste.newBuilder().setPasteID(-1).setTitle("Paste does not exist").build();
        }

        // Update paste
        paste = paste.toBuilder().setPasteID(PasteID).build();
        paste = paste.toBuilder().setDate(LocalDate.now().toString()).build();

        // Get the user who owns the paste
        File userFile = new File(path + userID + "/profile/" + "profile.txt");
        User.Builder builder = User.newBuilder();
        try (FileReader reader = new FileReader(userFile))
        {
            TextFormat.getParser().merge(reader, builder);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        // Update the paste in the user
        List<Paste> pastes = builder.getPastesList();
        List<Paste> editablePastes = new ArrayList<>(pastes);
        for (int i = 0; i < editablePastes.size(); i++)
        {
            if (editablePastes.get(i).getPasteID() == PasteID)
            {
                editablePastes.set(i, paste);
            }
        }
        builder.clearPastes();
        builder.addAllPastes(editablePastes);
        User user = builder.build();
        try (FileWriter writer = new FileWriter(userFile))
        {
            TextFormat.Printer printer = TextFormat.printer();
            printer.print(user, writer);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        // Write paste to file
        try (FileWriter writer = new FileWriter(file))
        {
            TextFormat.Printer printer = TextFormat.printer();
            printer.print(paste, writer);
            writer.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        this.createCommit("Updated Paste: " + PasteID + " from user with ID: " + userID, userID);
        return paste;
    }

    // Get latest changes for a specific user
    public GITResponse getLatestChanges(GetLatestChangesRequest request)
    {
        UserResponse user = this.getUser(GetUserRequest.newBuilder().setUserID(request.getUserID()).build());
        String Author = user.getUsername();
        File file = new File("./src/main/data/");
        GITResponse.Builder builder = GITResponse.newBuilder();
        try
        {
            Git git = Git.open(file);
            Iterable<RevCommit> commits = git.log().call();
            for (RevCommit commit : commits)
            {
                if (commit.getAuthorIdent().getName().equals(Author))
                {
                    builder.addCommit(Commit.newBuilder().setCommitID(commit.getName())
                            .setCommitDate(commit.getAuthorIdent().getWhen().toString())
                            .setCommitMessage(commit.getFullMessage())
                            .setCommitAuthor(commit.getAuthorIdent().getName())
                            .build());
                }
            }
            git.close();
            return builder.setCode(ResponseCode.OK).build();
        }
        catch (IOException | GitAPIException e)
        {
            System.out.println("Error: " + e.getMessage());
            GITResponse response = builder.setCode(ResponseCode.OK).setMessage("No Commits Found").build();
            return response;
        }
    }

    // Create a commit
    private void createCommit(String message, int UserID)
    {
        UserResponse user = this.getUser(GetUserRequest.newBuilder().setUserID(UserID).build()).toBuilder().build();
        File file = new File("./src/main/data/");

        try
        {
            Git git = Git.init().setDirectory(file).call();
            git.add().setUpdate(true).addFilepattern(".").call();
            git.add().addFilepattern(".").call();
            git.commit().setMessage(message).setAuthor(user.getUsername(), user.getEmail()).call();
            git.close();
        }
        catch (IllegalStateException | GitAPIException e)
        {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
