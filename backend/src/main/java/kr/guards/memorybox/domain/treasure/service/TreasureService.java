package kr.guards.memorybox.domain.treasure.service;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface TreasureService {
    Boolean registerTreasure() throws IOException, ParseException;
}
