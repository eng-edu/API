-- MySQL Script generated by MySQL Workbench
-- Fri Nov 23 11:19:15 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema BDARCO
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema BDARCO
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BDARCO` DEFAULT CHARACTER SET utf8 ;
USE `BDARCO` ;

-- -----------------------------------------------------
-- Table `BDARCO`.`DOCENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`DOCENTE` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `FORMACAO` VARCHAR(45) NOT NULL,
  `NOME` VARCHAR(45) NOT NULL,
  `EMAIL` VARCHAR(45) NOT NULL,
  `SENHA` VARCHAR(45) NOT NULL,
  `FOTO` VARCHAR(256) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `BDARCO`.`ARCO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`ARCO` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `STATUS` VARCHAR(45) NOT NULL,
  `NOME` VARCHAR(45) NOT NULL,
  `ID_CRIADOR` INT(11) NOT NULL,
  `DOCENTE_ID` INT(11) NOT NULL,
  `COMPARTILHADO` INT(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`),
  INDEX `fk_ARCO_DOCENTE1_idx` (`DOCENTE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_ARCO_DOCENTE1`
    FOREIGN KEY (`DOCENTE_ID`)
    REFERENCES `BDARCO`.`DOCENTE` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 85
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `BDARCO`.`DISCENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`DISCENTE` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `INSTITUICAO` VARCHAR(45) NOT NULL,
  `NOME` VARCHAR(45) NOT NULL,
  `EMAIL` VARCHAR(45) NOT NULL,
  `SENHA` VARCHAR(45) NOT NULL,
  `FOTO` VARCHAR(256) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 85
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `BDARCO`.`ETAPA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`ETAPA` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(45) NOT NULL,
  `RESUMO` TEXT NOT NULL,
  `STATUS` VARCHAR(45) NOT NULL,
  `ARCO_ID` INT(11) NOT NULL,
  PRIMARY KEY (`ID`, `ARCO_ID`),
  INDEX `fk_OBSREALIDADE_ARCO_idx` (`ARCO_ID` ASC) VISIBLE,
  CONSTRAINT `fk_OBSREALIDADE_ARCO`
    FOREIGN KEY (`ARCO_ID`)
    REFERENCES `BDARCO`.`ARCO` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 251
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `BDARCO`.`DOCUMENTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`DOCUMENTO` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `NOME` TEXT NOT NULL,
  `CAMINHO` TEXT NOT NULL,
  `ETAPA_ID` INT(11) NOT NULL,
  `ARCO_ID` INT(11) NOT NULL,
  PRIMARY KEY (`ID`, `ETAPA_ID`, `ARCO_ID`),
  INDEX `fk_DOCUMENTO_ETAPA1_idx` (`ETAPA_ID` ASC, `ARCO_ID` ASC) VISIBLE,
  CONSTRAINT `fk_DOCUMENTO_ETAPA1`
    FOREIGN KEY (`ETAPA_ID` , `ARCO_ID`)
    REFERENCES `BDARCO`.`ETAPA` (`ID` , `ARCO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 71
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `BDARCO`.`GENERATE_ID`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`GENERATE_ID` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 43
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `BDARCO`.`GRUPO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`GRUPO` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(45) NOT NULL,
  `DISCENTE_ID` INT(11) NOT NULL,
  `ARCO_ID` INT(11) NOT NULL,
  PRIMARY KEY (`ID`, `DISCENTE_ID`, `ARCO_ID`),
  INDEX `fk_GRUPO_DISCENTE1_idx` (`DISCENTE_ID` ASC) VISIBLE,
  INDEX `fk_GRUPO_ARCO1_idx` (`ARCO_ID` ASC) VISIBLE,
  CONSTRAINT `fk_GRUPO_ARCO1`
    FOREIGN KEY (`ARCO_ID`)
    REFERENCES `BDARCO`.`ARCO` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GRUPO_DISCENTE1`
    FOREIGN KEY (`DISCENTE_ID`)
    REFERENCES `BDARCO`.`DISCENTE` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 127
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `BDARCO`.`MENSAGEM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`MENSAGEM` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `TEXTO` VARCHAR(45) NOT NULL,
  `IDAUTOR` INT(11) NOT NULL,
  `DATA` DATETIME NOT NULL,
  `ARCO_ID` INT(11) NOT NULL,
  PRIMARY KEY (`ID`, `ARCO_ID`),
  INDEX `fk_MENSAGEM_ARCO1_idx` (`ARCO_ID` ASC) VISIBLE,
  CONSTRAINT `fk_MENSAGEM_ARCO1`
    FOREIGN KEY (`ARCO_ID`)
    REFERENCES `BDARCO`.`ARCO` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `BDARCO`.`SOLICITACAO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BDARCO`.`SOLICITACAO` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `ARCO_ID` INT(11) NOT NULL,
  `DOCENTE_ID` INT(11) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_SOLICITACOES_ARCO1_idx` (`ARCO_ID` ASC) VISIBLE,
  INDEX `fk_SOLICITACOES_DOCENTE1_idx` (`DOCENTE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_SOLICITACOES_ARCO1`
    FOREIGN KEY (`ARCO_ID`)
    REFERENCES `BDARCO`.`ARCO` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SOLICITACOES_DOCENTE1`
    FOREIGN KEY (`DOCENTE_ID`)
    REFERENCES `BDARCO`.`DOCENTE` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 51
DEFAULT CHARACTER SET = utf8;

USE `BDARCO` ;

-- -----------------------------------------------------
-- procedure verificar_completo
-- -----------------------------------------------------

DELIMITER $$
USE `BDARCO`$$
CREATE DEFINER=`root`@`%` PROCEDURE `verificar_completo`(arco_id int)
BEGIN
   IF(select count(BDARCO.ETAPA.STATUS)
	from BDARCO.ETAPA
	where BDARCO.ETAPA.ARCO_ID = arco_id
	AND BDARCO.ETAPA.STATUS = 1 
    having count(BDARCO.ETAPA.STATUS) = 5)
    
    then 
        UPDATE ARCO SET STATUS = 'CONCLUÍDO' WHERE ID = arco_id;
    else 
		select 'NÃO ESTÁ COMPLETO' as Msg;
    END IF;
    
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
