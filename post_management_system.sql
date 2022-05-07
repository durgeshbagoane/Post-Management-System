-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2022 at 06:11 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `post_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `ID` bigint(20) NOT NULL,
  `POST_ID` bigint(20) NOT NULL,
  `COMMENT_CONTENT` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_comments`
--

INSERT INTO `post_comments` (`ID`, `POST_ID`, `COMMENT_CONTENT`) VALUES
(1, 2, 'hiiiiiiii its a hello'),
(2, 2, 'kghkkghj');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` bigint(20) NOT NULL,
  `USER_NAME` varchar(150) NOT NULL,
  `PASSWORD` varchar(150) NOT NULL,
  `EMAIL` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `USER_NAME`, `PASSWORD`, `EMAIL`) VALUES
(1, 'test', 'hiiiiiiii', 'dfds@ff.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_posts`
--

CREATE TABLE `user_posts` (
  `ID` bigint(20) NOT NULL,
  `USER_ID` bigint(20) NOT NULL,
  `POST_CONTENT` longtext NOT NULL,
  `POST_IMAGE_URL` varchar(250) NOT NULL,
  `POST_COMMENT_IDS` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_posts`
--

INSERT INTO `user_posts` (`ID`, `USER_ID`, `POST_CONTENT`, `POST_IMAGE_URL`, `POST_COMMENT_IDS`) VALUES
(1, 2, 'hiiiiiiii', 'http://fgdfgdfc.om', '1,2'),
(2, 2, 'hii its meeee.', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1455185376876826625%2Fs1AjSxph_400x400.jpg&imgrefurl=https%3A%2F%2Ftwitter.com%2Fgoogle&tbnid=4J9ykC9cZ2HbMM&vet=12ahUKEwjns6vSvM33AhVO_zgGHQGmCqUQMygBegUIARDWAQ..i&d', '1,2'),
(4, 2, 'hiiiiiiii', 'http://fgdfgdfc.om', ''),
(5, 1, 'hiiiiiiii', 'http://fgdfgdfc.om', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user_posts`
--
ALTER TABLE `user_posts`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_posts`
--
ALTER TABLE `user_posts`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
