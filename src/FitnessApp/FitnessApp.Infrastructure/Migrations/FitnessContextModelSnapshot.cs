﻿// <auto-generated />
using System;
using FitnessApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FitnessApp.Infrastructure.Migrations
{
    [DbContext(typeof(FitnessContext))]
    partial class FitnessContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AllergyObligatoryForm", b =>
                {
                    b.Property<Guid>("AllergiesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ObligatoryFormsUserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("AllergiesId", "ObligatoryFormsUserId");

                    b.HasIndex("ObligatoryFormsUserId");

                    b.ToTable("ObligatoryFormAllergies", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.ActivityMode", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Coeficient")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("ActivityModes", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Allergy", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Class")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Food")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Group")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Allergies", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Coach", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CVFileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsVerified")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<string>("RecomendationText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Coaches", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Conversation", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("TimeCreated")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("User1Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("User2Id")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("User1Id");

                    b.HasIndex("User2Id");

                    b.ToTable("Conversations", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.CookingRange", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("MinuteEnd")
                        .HasColumnType("int");

                    b.Property<int>("MinuteStart")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("CookingRanges", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.DietForm", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ActivityModeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CookingRangeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DietModeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("GenerateFile")
                        .HasColumnType("bit");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("ActivityModeId");

                    b.HasIndex("CookingRangeId");

                    b.HasIndex("DietModeId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("DietForms", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.DietMode", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Coeficient")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("DietModes", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Excercise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Day")
                        .HasColumnType("int");

                    b.Property<string>("Difficulty")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Instructions")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Muscle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Part")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("TrainingFormId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TrainingFormId");

                    b.ToTable("Excercises", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Message", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConversationId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("SenderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeSent")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ConversationId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.ObligatoryForm", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Height")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.Property<int>("Years")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("ObligatoryForms", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.PasswordResetHolder", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<int>("Code")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExpirationTime")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("PasswordResetHolders", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Rating", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("RatingLevel")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeSent")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Ratings", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Recipe", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Calories")
                        .HasColumnType("float");

                    b.Property<double>("Carbohydrate")
                        .HasColumnType("float");

                    b.Property<double>("Cholesterol")
                        .HasColumnType("float");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DayOfTheWeek")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("DietFormId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DishType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Fat")
                        .HasColumnType("float");

                    b.Property<string>("Ingredients")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Iron")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Protein")
                        .HasColumnType("float");

                    b.Property<double>("Sugar")
                        .HasColumnType("float");

                    b.Property<double>("TransFat")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("DietFormId");

                    b.ToTable("Recipes", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.RecipeInstruction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Instruction")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<Guid>("RecipeId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId");

                    b.ToTable("RecipeInstructions", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Subscription", b =>
                {
                    b.Property<Guid>("SubscriptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CoachId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.HasKey("SubscriptionId");

                    b.HasIndex("ClientId")
                        .IsUnique();

                    b.HasIndex("CoachId");

                    b.ToTable("Subscriptions", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.TrainingForm", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Days")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("GenerateFile")
                        .HasColumnType("bit");

                    b.Property<Guid>("TrainingModeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TrainingModeId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("TrainingForms", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.TrainingMode", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("TrainingModes", (string)null);
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AvatarFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DietStatus")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool>("HasObligatoryForm")
                        .HasColumnType("bit");

                    b.Property<bool>("IsAdmin")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("TrainingStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("AllergyObligatoryForm", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.Allergy", null)
                        .WithMany()
                        .HasForeignKey("AllergiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitnessApp.Domain.Entities.ObligatoryForm", null)
                        .WithMany()
                        .HasForeignKey("ObligatoryFormsUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Coach", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.User", "User")
                        .WithOne("Coach")
                        .HasForeignKey("FitnessApp.Domain.Entities.Coach", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Conversation", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.User", "User1")
                        .WithMany("Conversations1")
                        .HasForeignKey("User1Id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("FitnessApp.Domain.Entities.User", "User2")
                        .WithMany("Conversations2")
                        .HasForeignKey("User2Id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("User1");

                    b.Navigation("User2");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.DietForm", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.ActivityMode", "ActivityMode")
                        .WithMany("DietForms")
                        .HasForeignKey("ActivityModeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitnessApp.Domain.Entities.CookingRange", "CookingRange")
                        .WithMany("DietForms")
                        .HasForeignKey("CookingRangeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitnessApp.Domain.Entities.DietMode", "DietMode")
                        .WithMany("DietForms")
                        .HasForeignKey("DietModeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitnessApp.Domain.Entities.User", "User")
                        .WithOne("DietForm")
                        .HasForeignKey("FitnessApp.Domain.Entities.DietForm", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ActivityMode");

                    b.Navigation("CookingRange");

                    b.Navigation("DietMode");

                    b.Navigation("User");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Excercise", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.TrainingForm", "TrainingForm")
                        .WithMany("Excercises")
                        .HasForeignKey("TrainingFormId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TrainingForm");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Message", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.Conversation", "Conversation")
                        .WithMany("Messages")
                        .HasForeignKey("ConversationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitnessApp.Domain.Entities.User", "Sender")
                        .WithMany("SentMessages")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Conversation");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.ObligatoryForm", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.User", "User")
                        .WithOne("ObligatoryForm")
                        .HasForeignKey("FitnessApp.Domain.Entities.ObligatoryForm", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.PasswordResetHolder", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.User", "User")
                        .WithMany("PasswordCodes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Rating", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.User", "User")
                        .WithMany("Ratings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Recipe", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.DietForm", "DietForm")
                        .WithMany("Recipes")
                        .HasForeignKey("DietFormId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DietForm");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.RecipeInstruction", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.Recipe", "Recipe")
                        .WithMany("Instructions")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Subscription", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.User", "Client")
                        .WithOne("SubscriptionForCoach")
                        .HasForeignKey("FitnessApp.Domain.Entities.Subscription", "ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitnessApp.Domain.Entities.Coach", "Coach")
                        .WithMany("Subscribers")
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Client");

                    b.Navigation("Coach");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.TrainingForm", b =>
                {
                    b.HasOne("FitnessApp.Domain.Entities.TrainingMode", "TrainingMode")
                        .WithMany("TrainingForms")
                        .HasForeignKey("TrainingModeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitnessApp.Domain.Entities.User", "User")
                        .WithOne("TrainingForm")
                        .HasForeignKey("FitnessApp.Domain.Entities.TrainingForm", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TrainingMode");

                    b.Navigation("User");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.ActivityMode", b =>
                {
                    b.Navigation("DietForms");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Coach", b =>
                {
                    b.Navigation("Subscribers");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Conversation", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.CookingRange", b =>
                {
                    b.Navigation("DietForms");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.DietForm", b =>
                {
                    b.Navigation("Recipes");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.DietMode", b =>
                {
                    b.Navigation("DietForms");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.Recipe", b =>
                {
                    b.Navigation("Instructions");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.TrainingForm", b =>
                {
                    b.Navigation("Excercises");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.TrainingMode", b =>
                {
                    b.Navigation("TrainingForms");
                });

            modelBuilder.Entity("FitnessApp.Domain.Entities.User", b =>
                {
                    b.Navigation("Coach");

                    b.Navigation("Conversations1");

                    b.Navigation("Conversations2");

                    b.Navigation("DietForm");

                    b.Navigation("ObligatoryForm");

                    b.Navigation("PasswordCodes");

                    b.Navigation("Ratings");

                    b.Navigation("SentMessages");

                    b.Navigation("SubscriptionForCoach")
                        .IsRequired();

                    b.Navigation("TrainingForm");
                });
#pragma warning restore 612, 618
        }
    }
}
